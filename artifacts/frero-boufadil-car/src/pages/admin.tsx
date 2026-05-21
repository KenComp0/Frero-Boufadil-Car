import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt, FaTrash, FaEdit, FaPlus, FaTimes, FaSpinner, FaWhatsapp } from "react-icons/fa";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp } from "firebase/firestore";

interface CarForm {
  brand: string;
  model: string;
  year: number;
  type: string;
  transmission: string;
  fuel: string;
  seats: number;
  pricePerDay: number;
  rating: number;
  reviews: number;
  features: string;
  available: boolean;
  badge: string;
  images: string[];
}

const emptyForm: CarForm = {
  brand: "", model: "", year: new Date().getFullYear(), type: "Berline",
  transmission: "manual", fuel: "petrol", seats: 5, pricePerDay: 200,
  rating: 4.5, reviews: 0, features: "", available: true, badge: "", images: [],
};

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [cars, setCars] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CarForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setCars(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
    }
    setAuthLoading(false);
  };

  const handleLogout = () => signOut(auth);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setNewImageUrls([]);
    setImageUrlInput("");
  };

  const openEdit = (car: any) => {
    setForm({
      brand: car.brand, model: car.model, year: car.year, type: car.type,
      transmission: car.transmission, fuel: car.fuel, seats: car.seats,
      pricePerDay: car.pricePerDay, rating: car.rating, reviews: car.reviews,
      features: (car.features || []).join(", "), available: car.available,
      badge: car.badge || "", images: car.images || [],
    });
    setEditingId(car.id);
    setShowForm(true);
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim()) {
      setNewImageUrls([...newImageUrls, imageUrlInput.trim()]);
      setImageUrlInput("");
    }
  };

  const removeNewImage = (idx: number) => {
    setNewImageUrls(newImageUrls.filter((_, i) => i !== idx));
  };

  const removeExistingImage = (idx: number) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });
  };

  const handleImgBBUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const urls: string[] = [];
      const imgBBKey = import.meta.env.VITE_IMGBB_API_KEY;
      const imgBBAlbum = import.meta.env.VITE_IMGBB_ALBUM || "";
      if (!imgBBKey) { setError("VITE_IMGBB_API_KEY non configurée"); setUploading(false); return; }
      for (const file of files) {
        const fd = new FormData();
        fd.append("image", file);
        if (imgBBAlbum) fd.append("album", imgBBAlbum);
        const url = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;
        const res = await fetch(url, { method: "POST", body: fd });
        const data = await res.json();
        if (data.data?.url) {
          urls.push(data.data.url);
        } else {
          setError(data.error?.message || "Échec upload ImgBB");
        }
      }
      if (urls.length) setNewImageUrls((prev) => [...prev, ...urls]);
    } catch {
      setError("Erreur lors de l'upload des images");
    }
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const features = form.features.split(",").map((s) => s.trim()).filter(Boolean);
      const data = {
        brand: form.brand, model: form.model, year: form.year, type: form.type,
        transmission: form.transmission, fuel: form.fuel, seats: form.seats,
        pricePerDay: form.pricePerDay, rating: form.rating, reviews: form.reviews,
        features, available: form.available, badge: form.badge || null,
        images: [...form.images, ...newImageUrls],
      };

      if (editingId) {
        await updateDoc(doc(db, "cars", editingId), data);
      } else {
        await addDoc(collection(db, "cars"), { ...data, createdAt: Timestamp.now() });
      }
      resetForm();
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la sauvegarde");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette voiture ?")) return;
    await deleteDoc(doc(db, "cars", id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <FaSpinner className="animate-spin text-[#C8A96E] w-8 h-8" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#141414] border border-[#C8A96E]/20 rounded-2xl p-8 w-full max-w-sm">
          <h1 className="font-['Syne'] text-2xl font-bold text-white text-center mb-6">Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full bg-[#1a1a1a] border border-[#C8A96E]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A96E]/50" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required className="w-full bg-[#1a1a1a] border border-[#C8A96E]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A96E]/50" />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button type="submit" disabled={authLoading} className="w-full bg-[#C8A96E] hover:bg-[#d4b87c] text-[#0A0A0A] font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-50">
              {authLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-['Syne'] text-3xl font-bold text-[#C8A96E]">Administration</h1>
          <div className="flex items-center gap-4">
            <motion.button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-[#C8A96E] hover:bg-[#d4b87c] text-[#0A0A0A] font-bold px-5 py-2.5 rounded-xl text-sm transition-colors" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <FaPlus /> Ajouter
            </motion.button>
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
              <FaSignOutAlt /> Déconnexion
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {cars.map((car) => (
            <div key={car.id} className="bg-[#141414] border border-[#C8A96E]/10 rounded-xl p-4 flex items-center gap-4">
              <img src={car.images?.[0] || ""} alt="" className="w-16 h-12 object-cover rounded-lg" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{car.brand} {car.model} {car.year}</p>
                <p className="text-gray-400 text-xs">{car.type} · {car.transmission} · {car.pricePerDay} MAD/j</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <motion.button onClick={() => openEdit(car)} className="p-2 text-gray-400 hover:text-[#C8A96E] transition-colors" whileTap={{ scale: 0.9 }}>
                  <FaEdit />
                </motion.button>
                <motion.button onClick={() => handleDelete(car.id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors" whileTap={{ scale: 0.9 }}>
                  <FaTrash />
                </motion.button>
              </div>
            </div>
          ))}
          {cars.length === 0 && <p className="text-gray-500 text-center py-12">Aucune voiture pour le moment.</p>}
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { if (!saving) { setShowForm(false); resetForm(); } }} />
            <motion.div className="relative z-10 bg-[#141414] border border-[#C8A96E]/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Syne'] text-xl font-bold text-white">{editingId ? "Modifier" : "Ajouter"} une voiture</h2>
                <button onClick={() => { setShowForm(false); resetForm(); }} className="text-gray-400 hover:text-white p-1"><FaTimes /></button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Marque</label>
                  <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40" />
                </div>
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Modèle</label>
                  <input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40" />
                </div>
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Année</label>
                  <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40" />
                </div>
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40">
                    <option value="Berline">Berline</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Transmission</label>
                  <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40">
                    <option value="manual">Manuelle</option>
                    <option value="automatic">Automatique</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Carburant</label>
                  <select value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40">
                    <option value="petrol">Essence</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Électrique</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Places</label>
                  <input type="number" value={form.seats} onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })} className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40" />
                </div>
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Prix/jour (MAD)</label>
                  <input type="number" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: Number(e.target.value) })} className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40" />
                </div>
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Note</label>
                  <input type="number" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40" />
                </div>
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Avis</label>
                  <input type="number" value={form.reviews} onChange={(e) => setForm({ ...form, reviews: Number(e.target.value) })} className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40" />
                </div>
                <div>
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Badge</label>
                  <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Populaire, Nouveau, Économique..." className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40" />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider">Disponible</label>
                  <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="accent-[#C8A96E]" />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Caractéristiques (séparées par des virgules)</label>
                <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={2} className="w-full bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40 resize-none" />
              </div>

              <div className="mb-4">
                <label className="text-xs text-[#C8A96E] font-semibold uppercase tracking-wider block mb-1">Images</label>

                {form.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {form.images.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} alt="" className="w-20 h-16 object-cover rounded-lg border border-[#C8A96E]/20" />
                        <button onClick={() => removeExistingImage(i)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"><FaTimes /></button>
                      </div>
                    ))}
                  </div>
                )}

                {newImageUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {newImageUrls.map((url, i) => (
                      <div key={`new-${i}`} className="relative group">
                        <img src={url} alt="" className="w-20 h-16 object-cover rounded-lg border border-green-500/40" />
                        <button onClick={() => removeNewImage(i)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"><FaTimes /></button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 mb-2">
                  <input value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} placeholder="Coller une URL d'image..." className="flex-1 bg-[#1a1a1a] border border-[#C8A96E]/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/40" />
                  <button onClick={addImageUrl} className="bg-[#C8A96E] hover:bg-[#d4b87c] text-[#0A0A0A] font-bold px-4 py-2 rounded-xl text-sm transition-colors shrink-0">Ajouter</button>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Ou uploader depuis ImgBB :</label>
                  <input type="file" accept="image/*" multiple onChange={(e) => handleImgBBUpload(e.target.files)} className="text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#C8A96E]/20 file:text-[#C8A96E] hover:file:bg-[#C8A96E]/30 cursor-pointer" />
                  {uploading && <p className="text-[#C8A96E] text-xs mt-1"><FaSpinner className="animate-spin inline mr-1" />Upload en cours...</p>}
                </div>
              </div>

              {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

              <div className="flex gap-3 justify-end">
                <button onClick={() => { setShowForm(false); resetForm(); }} className="px-6 py-2.5 border border-gray-600 text-gray-300 rounded-xl text-sm hover:bg-gray-800 transition-colors">Annuler</button>
                <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-[#C8A96E] hover:bg-[#d4b87c] text-[#0A0A0A] font-bold rounded-xl text-sm transition-colors disabled:opacity-50">
                  {saving ? "Enregistrement..." : editingId ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
