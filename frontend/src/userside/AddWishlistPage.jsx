/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRegEdit, FaExternalLinkAlt, FaGift } from "react-icons/fa";
import { MdOutlineDelete, MdLocationOn, MdPhone } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";

/* ─── Design tokens (same palette as RekodTempahanPage) ─────────── */
const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fdf6f0 0%, #fceee8 50%, #f9e4e4 100%)",
    paddingBottom: "5rem",
    paddingTop: "1.5rem",
  },
  inner: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "0 1rem",
  },
  /* ── Page title ── */
  pageTitle: {
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#5c3d3d",
    marginBottom: "0.25rem",
    letterSpacing: "0.02em",
  },
  pageSub: {
    textAlign: "center",
    fontSize: "0.82rem",
    color: "#b07080",
    marginBottom: "1.5rem",
  },
  /* ── Info panel (address + phone) ── */
  infoPanel: {
    background: "rgba(255,255,255,0.85)",
    border: "1px solid rgba(201,116,143,0.18)",
    borderRadius: "1rem",
    padding: "0.9rem 1.1rem",
    marginBottom: "1rem",
    boxShadow: "0 2px 12px rgba(180,100,120,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    fontSize: "0.85rem",
    color: "#3d2020",
  },
  infoIcon: { color: "#c9748f", marginTop: "0.15rem", flexShrink: 0 },
  infoLabel: {
    fontWeight: 700,
    color: "#b07080",
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    display: "block",
    marginBottom: "0.1rem",
  },
  infoValue: { fontSize: "0.87rem", color: "#3d2020", fontWeight: 500 },
  infoEmpty: { fontSize: "0.82rem", color: "#cca8a8", fontStyle: "italic" },
  /* ── Action bar ── */
  actionBar: {
    display: "flex",
    gap: "0.6rem",
    marginBottom: "1.25rem",
    flexWrap: "wrap",
  },
  /* ── Section header ── */
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
  },
  sectionTitle: {
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "#b07080",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  countBadge: {
    background: "linear-gradient(135deg, #c9748f, #e8a598)",
    color: "#fff",
    fontSize: "0.7rem",
    fontWeight: 700,
    padding: "0.15rem 0.6rem",
    borderRadius: "999px",
  },
  /* ── Wishlist item card ── */
  itemCard: {
    background: "rgba(255,255,255,0.9)",
    border: "1px solid rgba(201,116,143,0.15)",
    borderRadius: "1rem",
    marginBottom: "0.85rem",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(180,100,120,0.07)",
    display: "flex",
    alignItems: "stretch",
    transition: "box-shadow 0.18s",
  },
  itemCardBooked: {
    background: "rgba(220,252,231,0.88)",
    border: "1px solid rgba(34,197,94,0.25)",
  },
  /* coloured left stripe */
  stripe: {
    width: 5,
    minWidth: 5,
    background: "linear-gradient(180deg, #c9748f, #e8a598)",
    borderRadius: "1rem 0 0 1rem",
  },
  stripeBooked: {
    background: "linear-gradient(180deg, #22c55e, #4ade80)",
  },
  /* image thumbnail */
  thumbWrap: {
    width: 72,
    minWidth: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(252,238,232,0.6)",
    padding: "0.5rem 0",
  },
  thumb: {
    width: 56,
    height: 56,
    objectFit: "cover",
    borderRadius: "0.5rem",
    border: "1.5px solid rgba(201,116,143,0.2)",
  },
  thumbPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: "0.5rem",
    background: "rgba(201,116,143,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#c9748f",
    fontSize: "1.4rem",
  },
  /* main content */
  itemContent: {
    flex: 1,
    padding: "0.65rem 0.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    minWidth: 0,
  },
  itemTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.4rem",
  },
  itemIndex: {
    fontSize: "0.65rem",
    color: "#c9748f",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  statusPill: (booked) => ({
    fontSize: "0.62rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    padding: "0.15rem 0.55rem",
    borderRadius: "999px",
    background: booked
      ? "rgba(34,197,94,0.15)"
      : "rgba(201,116,143,0.12)",
    color: booked ? "#15803d" : "#c9748f",
    whiteSpace: "nowrap",
  }),
  itemName: {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#3d2020",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  bookedMeta: {
    fontSize: "0.75rem",
    color: "#4b7a57",
    fontWeight: 500,
  },
  /* bottom actions inside card */
  cardActions: {
    display: "flex",
    gap: "0.4rem",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "0.25rem",
  },
  linkBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.28rem 0.6rem",
    borderRadius: "0.45rem",
    border: "1.5px solid rgba(59,130,246,0.35)",
    background: "rgba(59,130,246,0.07)",
    color: "#2563eb",
    fontSize: "0.72rem",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
  },
  /* empty state */
  emptyState: {
    textAlign: "center",
    padding: "2.5rem 1rem",
    color: "#b07080",
  },
  emptyIcon: { fontSize: "2.8rem", marginBottom: "0.6rem" },
  emptyText: { fontSize: "0.9rem" },
};

/* ─── Wishlist Item Card ─────────────────────────────────────────── */
function WishlistCard({ item, index, onEdit, onDelete }) {
  const isBooked = item.bookingStatus === "Booked";
  return (
    <div style={{ ...S.itemCard, ...(isBooked ? S.itemCardBooked : {}) }}>
      {/* Coloured left stripe */}
      <div style={{ ...S.stripe, ...(isBooked ? S.stripeBooked : {}) }} />

      {/* Product thumbnail */}
      <div style={S.thumbWrap}>
        {item.productImage ? (
          <img
            src={
              typeof item.productImage === "string"
                ? item.productImage
                : URL.createObjectURL(item.productImage)
            }
            alt={item.productName}
            style={S.thumb}
          />
        ) : (
          <div style={S.thumbPlaceholder}>🎁</div>
        )}
      </div>

      {/* Main info */}
      <div style={S.itemContent}>
        <div style={S.itemTop}>
          <span style={S.itemIndex}>Item #{index + 1}</span>
          <span style={S.statusPill(isBooked)}>
            {isBooked ? "✓ Ditempah" : "Tersedia"}
          </span>
        </div>

        <div style={S.itemName} title={item.productName}>
          {item.productName || <span style={{ color: "#cca8a8", fontStyle: "italic" }}>Tiada nama</span>}
        </div>

        {/* Booked-by details */}
        {isBooked && (
          <div style={S.bookedMeta}>
            👤 {item.bookingName}
            {item.bookingPhoneNumber && ` · 📞 ${item.bookingPhoneNumber}`}
          </div>
        )}

        {/* Actions row */}
        <div style={S.cardActions}>
          {item.productUrl && (
            <a
              href={item.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={S.linkBtn}
            >
              <FaExternalLinkAlt size={10} /> Lihat Produk
            </a>
          )}
          <Button size="xs" color="warning" onClick={() => onEdit(index)}>
            <FaRegEdit className="mr-1" /> Edit
          </Button>
          <Button size="xs" color="failure" onClick={() => onDelete(index)}>
            <MdOutlineDelete className="mr-1" /> Padam
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
const AddWishlistPage = () => {
  const { orderNumber } = useParams();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [currentWishlistItem, setCurrentWishlistItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  /* ── Fetch ── */
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/wishlist/order/${orderNumber}`);
      const {
        address, phone,
        wishlistProduct1, wishlistProduct2, wishlistProduct3,
        wishlistProduct4, wishlistProduct5, wishlistProduct6,
        wishlistProduct7, wishlistProduct8, wishlistProduct9,
        wishlistProduct10, wishlistProduct11, wishlistProduct12,
        wishlistProduct13, wishlistProduct14, wishlistProduct15,
      } = response.data || {};

      setAddress(address || "");
      setPhone(phone || "");

      const items = [
        wishlistProduct1, wishlistProduct2, wishlistProduct3,
        wishlistProduct4, wishlistProduct5, wishlistProduct6,
        wishlistProduct7, wishlistProduct8, wishlistProduct9,
        wishlistProduct10, wishlistProduct11, wishlistProduct12,
        wishlistProduct13, wishlistProduct14, wishlistProduct15,
      ].filter(Boolean);

      setWishlistItems(
        items.map((item) => ({ ...item, productImage: item.productImage || null }))
      );
    } catch (err) {
      console.error("Error fetching wishlist data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWishlist(); }, [orderNumber]);

  /* ── Add / Edit ── */
  const handleAddWishlistItem = () => {
    setCurrentWishlistItem({ productName: "", productUrl: "", productImage: null, bookingStatus: "Available" });
    setIsWishlistModalOpen(true);
  };

  const handleEditWishlistItem = (index) => {
    setCurrentWishlistItem({ ...wishlistItems[index], index });
    setIsWishlistModalOpen(true);
  };

  const handleSaveWishlistItem = async () => {
    let updatedItems;
    if (currentWishlistItem.index !== undefined) {
      updatedItems = wishlistItems.map((item, idx) =>
        idx === currentWishlistItem.index ? currentWishlistItem : item
      );
    } else {
      updatedItems = [...wishlistItems, currentWishlistItem];
    }
    setIsWishlistModalOpen(false);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("orderNumber", orderNumber);
      formData.append("address", address);
      formData.append("phone", phone);
      updatedItems.forEach((item, index) => {
        const i = index + 1;
        formData.append(`wishlistproductname${i}`, item.productName);
        formData.append(`wishlistproducturl${i}`, item.productUrl);
        if (item.productImage instanceof File) {
          formData.append(`wishlistImage${i}`, item.productImage);
        } else if (typeof item.productImage === "string" && item.productImage) {
          formData.append(`existingImage${i}`, item.productImage);
        }
      });
      await axios.post(`/api/wishlist/upload-wishlist`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Wishlist berjaya dikemaskini!", {
        autoClose: 1000,
        position: "top-center",
        closeOnClick: true,
      });
      setWishlistItems(updatedItems);
      fetchWishlist();
    } catch (err) {
      console.error("Error submitting wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Delete ── */
  const handleDeleteConfirmation = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteIndex === null) return;
    try {
      const productIndex = deleteIndex + 1;
      await axios.delete(`/api/wishlist/delete/${orderNumber}/${productIndex}`);
      setWishlistItems((prev) => prev.filter((_, i) => i !== deleteIndex));
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteIndex(null);
    }
  };

  const canAddMore = wishlistItems.length < 15;

  /* ══════════════════ RENDER ══════════════════ */
  return (
    <div style={S.page}>
      <div style={S.inner}>

        {/* ── Page Title ── */}
        <h1 style={S.pageTitle}>🎁 Wishlist Hadiah</h1>

        {/* ── Info Panel: Address + Phone ── */}
        <div style={S.infoPanel}>
          <div style={S.infoRow}>
            <MdLocationOn size={16} style={S.infoIcon} />
            <div style={{ minWidth: 0 }}>
              <span style={S.infoLabel}>Alamat Penghantaran</span>
              {address
                ? <span style={S.infoValue}>{address}</span>
                : <span style={S.infoEmpty}>Belum ditetapkan</span>
              }
            </div>
          </div>
          <div style={S.infoRow}>
            <MdPhone size={16} style={S.infoIcon} />
            <div>
              <span style={S.infoLabel}>No. Telefon</span>
              {phone
                ? <span style={S.infoValue}>{phone}</span>
                : <span style={S.infoEmpty}>Belum ditetapkan</span>
              }
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div style={S.actionBar}>
          <Button
            size="sm"
            color="light"
            style={{ border: "1.5px solid rgba(201,116,143,0.35)", color: "#c9748f" }}
            onClick={() => setIsAddressModalOpen(true)}
          >
            <MdLocationOn className="mr-1 mt-1" /> Kemaskini Alamat
          </Button>
          {canAddMore && (
            <Button
              size="sm"
              style={{
                background: "linear-gradient(135deg,#c9748f,#e8a598)",
                border: "none",
                color: "#fff",
                fontWeight: 700,
              }}
              onClick={handleAddWishlistItem}
            >
              <HiPlus className="mr-1 mt-1 text-center" /> Tambah Item Wishlist
            </Button>
          )}
        </div>

        {/* ── Section Header ── */}
        <div style={S.sectionHeader}>
          <span style={S.sectionTitle}>Senarai Wishlist</span>
          <span style={S.countBadge}>
            {wishlistItems.length} / 15 item
          </span>
        </div>

        {/* ── Limit note ── */}
        {wishlistItems.length >= 15 && (
          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#b07080", marginBottom: "0.5rem" }}>
            ⚠️ Had maksimum 15 item telah dicapai.
          </p>
        )}

        {/* ── Wishlist Cards ── */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "#b07080" }}>
            ⏳ Memuatkan...
          </div>
        ) : wishlistItems.length > 0 ? (
          wishlistItems.map((item, index) => (
            <WishlistCard
              key={index}
              item={item}
              index={index}
              onEdit={handleEditWishlistItem}
              onDelete={handleDeleteConfirmation}
            />
          ))
        ) : (
          <div style={S.emptyState}>
            <div style={S.emptyIcon}>🎁</div>
            <p style={S.emptyText}>Tiada item wishlist lagi.</p>
            <p style={{ ...S.emptyText, fontSize: "0.8rem", marginTop: "0.3rem" }}>
              Tekan &quot;Tambah Item Wishlist&quot; untuk mula.
            </p>
          </div>
        )}

        {/* ── Limit note ── */}
        {wishlistItems.length >= 15 && (
          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#b07080", marginTop: "0.5rem" }}>
            ⚠️ Had maksimum 15 item telah dicapai.
          </p>
        )}
      </div>

      {/* ═══ ADDRESS MODAL ═══ */}
      <Modal show={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)}>
        <Modal.Header>Kemaskini Maklumat Penghantaran</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alamat
              </label>
              <TextInput
                type="text"
                placeholder="Masukkan alamat anda"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No. Telefon
              </label>
              <TextInput
                type="text"
                placeholder="Masukkan no. telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setIsAddressModalOpen(false)}>Simpan</Button>
        </Modal.Footer>
      </Modal>

      {/* ═══ WISHLIST ITEM MODAL ═══ */}
      <Modal show={isWishlistModalOpen} onClose={() => setIsWishlistModalOpen(false)}>
        <Modal.Header>
          {currentWishlistItem?.index !== undefined ? "Edit Item Wishlist" : "Tambah Item Wishlist"}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Produk
              </label>
              <TextInput
                type="text"
                placeholder="Cth: Hamper, Pinggan..."
                value={currentWishlistItem?.productName || ""}
                onChange={(e) =>
                  setCurrentWishlistItem((prev) => ({ ...prev, productName: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Produk <span style={{ color: "#aaa", fontWeight: 400 }}>(pilihan)</span>
              </label>
              <TextInput
                type="text"
                placeholder="https://shopee.com.my/..."
                value={currentWishlistItem?.productUrl || ""}
                onChange={(e) =>
                  setCurrentWishlistItem((prev) => ({ ...prev, productUrl: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gambar Produk <span style={{ color: "#aaa", fontWeight: 400 }}>(pilihan)</span>
              </label>
              {/* Show current image preview if available */}
              {currentWishlistItem?.productImage && (
                <img
                  src={
                    typeof currentWishlistItem.productImage === "string"
                      ? currentWishlistItem.productImage
                      : URL.createObjectURL(currentWishlistItem.productImage)
                  }
                  alt="Preview"
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "0.5rem", marginBottom: "0.5rem" }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                onChange={(e) =>
                  setCurrentWishlistItem((prev) => ({ ...prev, productImage: e.target.files[0] }))
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ background: "linear-gradient(135deg,#c9748f,#e8a598)", border: "none" }}
            onClick={handleSaveWishlistItem}
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Wishlist"}
          </Button>
          <Button color="gray" onClick={() => setIsWishlistModalOpen(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ═══ DELETE CONFIRM MODAL ═══ */}
      <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <Modal.Header>Sahkan Pemadaman</Modal.Header>
        <Modal.Body>
          <p className="text-gray-700">
            Adakah anda pasti ingin memadam item wishlist ini? Tindakan ini tidak boleh dibatalkan.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleConfirmDelete} className="mr-2">
            Ya, Padam
          </Button>
          <Button color="gray" onClick={() => setIsDeleteModalOpen(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddWishlistPage;
