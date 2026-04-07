import { useContext, useEffect, useState } from "react";
import HeaderBackground from "../components/HeaderBackground";
import { UserContext } from "../customhooks/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Badge, Button, Modal } from "flowbite-react";
import { MdPayment } from "react-icons/md";
import { FaRegPlayCircle, FaRegEdit, FaRegCopy, FaCheck } from "react-icons/fa";
import { CiGift } from "react-icons/ci";
import { IoPeople } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import { FiCalendar, FiHash, FiPackage, FiDollarSign } from "react-icons/fi";
import CopyToClipboardButton from "../customhooks/CopyToClipboard";
import LoadingWrapper from "../customhooks/LoadingWrapper";
import { toast } from "react-toastify";

/* ─── inline styles: wedding luxury palette ─────────────────────────── */
const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fdf6f0 0%, #fceee8 50%, #f9e4e4 100%)",
    paddingBottom: "3rem",
  },
  section: {
    maxWidth: 680,
    margin: "0 auto",
    padding: "1.5rem 1rem",
  },
  /* summary bar */
  summaryBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.25rem",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  summaryText: {
    // fontFamily: "'Playfair Display', serif",
    fontSize: "1.1rem",
    color: "#5c3d3d",
    fontWeight: 600,
  },
  summaryCount: {
    background: "linear-gradient(135deg, #c9748f, #e8a598)",
    color: "#fff",
    fontSize: "0.75rem",
    fontWeight: 700,
    padding: "0.2rem 0.75rem",
    borderRadius: "999px",
    letterSpacing: "0.04em",
  },
  /* card wrapper */
  card: {
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(201,116,143,0.18)",
    borderRadius: "1.25rem",
    boxShadow:
      "0 4px 24px 0 rgba(180,100,120,0.08), 0 1px 4px 0 rgba(180,100,120,0.06)",
    marginBottom: "1.25rem",
    overflow: "hidden",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  },
  /* card header strip */
  cardHeader: {
    background: "linear-gradient(90deg, #c9748f 0%, #e8a598 100%)",
    padding: "0.7rem 1.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
  },
  orderNumberLabel: {
    color: "rgba(255,255,255,0.78)",
    fontSize: "0.7rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontWeight: 600,
  },
  orderNumberValue: {
    color: "#fff",
    fontFamily: "'Playfair Display', serif",
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "0.02em",
  },
  /* info grid inside card body */
  cardBody: {
    padding: "1rem 1.1rem 0.8rem",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem 1rem",
    marginBottom: "0.9rem",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.18rem",
  },
  infoLabel: {
    fontSize: "0.65rem",
    fontWeight: 700,
    color: "#b07080",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  infoValue: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    padding: "0.35rem 0.65rem",
    borderRadius: "0.5rem",
    border: "1.5px solid rgba(201,116,143,0.4)",
    color: "#111111ff",
    fontSize: "0.78rem",
    fontWeight: 650,
    cursor: "pointer",
    transition: "all 0.2s ease",
    letterSpacing: "0.03em",
  },
  /* divider */
  divider: {
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(201,116,143,0.2), transparent)",
    margin: "0.75rem 0",
  },
  /* card link row */
  linkRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    alignItems: "center",
    marginBottom: "0.9rem",
  },
  /* action row */
  actionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.45rem",
    alignItems: "center",
  },
  /* empty state */
  emptyState: {
    textAlign: "center",
    padding: "3rem 1rem",
    color: "#b07080",
  },
  emptyIcon: { fontSize: "3rem", marginBottom: "0.75rem" },
  emptyTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.25rem",
    color: "#5c3d3d",
    fontWeight: 600,
    marginBottom: "0.4rem",
  },
  emptyText: { fontSize: "0.9rem", color: "#b07080" },
};

/* Badge colour helper */
const paymentColor = (status) => {
  if (status === "paid") return "success";
  if (status === "pending") return "warning";
  if (status === "deleted") return "failure";
  return "gray";
};

/* ─── Tiny inline-copy button (avoids flowbite Button overhead) ───── */
function InlineCopyButton({ content }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent */
    }
  };
  return (
    <button
      onClick={handleCopy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        padding: "0.35rem 0.65rem",
        borderRadius: "0.5rem",
        border: "1.5px solid rgba(201,116,143,0.4)",
        background: copied
          ? "linear-gradient(135deg,#c9748f,#e8a598)"
          : "rgba(255,255,255,0.7)",
        color: copied ? "#fff" : "#c9748f",
        fontSize: "0.78rem",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.2s ease",
        letterSpacing: "0.03em",
      }}
    >
      {copied ? (
        <>
          <FaCheck size={12} /> Disalin!
        </>
      ) : (
        <>
          <FaRegCopy size={12} /> Salin Jemputan
        </>
      )}
    </button>
  );
}

/* ─── Single Order Card ─────────────────────────────────────────────── */
function OrderCard({ order, onDelete, navigate, formatDate }) {
  const isPaid = order.paymentStatus === "paid";
  const isPending = order.paymentStatus === "pending";
  const isParisAndPaid =
    order.weddingCardId?.pakej === "Paris" && isPaid;
  const isNotBaliAndPaid =
    order.weddingCardId?.pakej !== "Bali" && isPaid;

  const inviteText = `👰🏻‍♀🤵🏻UNDANGAN WALIMATUL URUS 🤍

‎بِسۡـــــــــمِ ٱللهِ ٱلرَّحۡـمَـٰنِ ٱلرَّحِـــــــيمِ
‎السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ

Bismillahirrahmanirrahim.
Assalamualaikum W.B.T & Salam Sejahtera.

Dengan penuh kesyukuran ke hadrat Ilahi, kami sekeluarga ingin menjemput Tuan/Puan/Saudara/Saudari ke majlis perkahwinan anakkanda kami:

${order.weddingCardId?.namaPenuhLelaki}
                     &
${order.weddingCardId?.namaPenuhPerempuan}

🗓 Pada ${formatDate(order.weddingCardId?.tarikhMajlis)}

🏠 Bertempat di :
${order.weddingCardId?.locationMajlis}

⏰ Pada jam : ${order.weddingCardId?.majlisStart} - ${order.weddingCardId?.majlisEnd}

✉ RSVP : Bagi tetamu yang hadir, sila isi RSVP sebelum ${formatDate(order.weddingCardId?.maxDate)}

Link RSVP 👉🏻 https://www.jemputkahwin.com.my/weddingcard/${order.weddingCardId?.hashtag}/${order.orderNumber}

Semoga dengan kehadiran Tuan/Puan/Saudara/Saudari akan lebih menyerikan dan memberkati majlis yang bakal berlangsung nanti.
Doakan kelancaran dan segala urusan kami dipermudahkan.`;

  return (
    <div style={S.card}>
      {/* ── Header strip ── */}
      <div style={S.cardHeader}>
        <div style={S.cardHeaderLeft}>
          <FiHash color="rgba(255,255,255,0.7)" size={14} />
          <div>
            <div style={S.orderNumberLabel}>No. Tempahan</div>
            <div style={S.orderNumberValue}>{order.orderNumber}</div>
          </div>
        </div>
        {/* Payment status badge */}
        <Badge
          color={paymentColor(order.paymentStatus)}
          style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}
        >
          {order.paymentStatus === "paid"
            ? "Telah Dibayar"
            : order.paymentStatus === "pending"
              ? "Belum Dibayar"
              : order.paymentStatus}
        </Badge>
      </div>

      {/* ── Card Body ── */}
      <div style={S.cardBody}>
        {/* Info Grid: 2-column on all screens */}
        <div style={S.infoGrid}>
          <div style={S.infoItem}>
            <span style={S.infoLabel}>
              <FiCalendar size={10} /> Tarikh Daftar
            </span>
            <span style={S.infoValue}>
              {new Date(order.createdAt).toLocaleDateString("ms-MY", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div style={S.infoItem}>
            <span style={S.infoLabel}>
              <FiDollarSign size={10} /> Harga
            </span>
            <span style={S.infoValue}>RM {order.price}</span>
          </div>

          <div style={S.infoItem}>
            <span style={S.infoLabel}>
              <FiPackage size={10} /> Pakej
            </span>
            <span style={S.infoValue}>
              {order.weddingCardId?.pakej || "N/A"}
            </span>
          </div>

          {/* Pay button if pending — sits in the grid */}
          {isPending && (
            <div style={S.infoItem}>
              <span style={S.infoLabel}>💳 Pembayaran</span>
              <button
                onClick={() =>
                  navigate(`/payment/${order.orderNumber}/${order._id}`)
                }
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  padding: "0.38rem 0.75rem",
                  borderRadius: "0.55rem",
                  border: "none",
                  background: "linear-gradient(135deg,#22c55e,#16a34a)",
                  color: "#fff",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  width: "fit-content",
                }}
              >
                <MdPayment size={15} /> Bayar Sekarang
              </button>
            </div>
          )}
        </div>

        <div style={S.divider} />

        {/* ── Card Link Row ── */}
        <div style={{ marginBottom: "0.5rem" }}>
          <span style={{ ...S.infoLabel, marginBottom: "0.45rem", display: "flex" }}>
            🔗 Pautan Kad
          </span>
          <div style={S.linkRow}>
            {/* Preview (unpaid) */}
            {!isPaid && (
              <a
                href={`/weddingcardpreview/${order.weddingCardId?.hashtag}/${order.orderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  padding: "0.38rem 0.75rem",
                  borderRadius: "0.55rem",
                  background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
                  color: "#fff",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <FaRegPlayCircle size={13} /> Preview Kad
              </a>
            )}

            {/* Live card + copy (paid) */}
            {isPaid && (
              <>
                <a
                  href={`/weddingcard/${order.weddingCardId?.hashtag}/${order.orderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.38rem 0.75rem",
                    borderRadius: "0.55rem",
                    background: "linear-gradient(135deg,#c9748f,#e8a598)",
                    color: "#fff",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <FaRegPlayCircle size={13} /> Lihat Kad Digital
                </a>
                <InlineCopyButton content={inviteText} />
              </>
            )}
          </div>
        </div>

        <div style={S.divider} />

        {/* ── Action Row ── */}
        <div>
          <span style={{ ...S.infoLabel, marginBottom: "0.45rem", display: "flex" }}>
            ⚙ Tindakan
          </span>
          <div style={S.actionRow}>
            {/* Update */}
            <Button
              size="xs"
              color="warning"
              onClick={() =>
                navigate(
                  `/kad-digital/tempah/${order.weddingCardId?.designName}/${order.weddingCardId?._id}`,
                  { state: { order } }
                )
              }
            >
              <FaRegEdit className="mr-1" /> Kemaskini
            </Button>

            {/* RSVP */}
            {isNotBaliAndPaid && (
              <Button
                size="xs"
                color="blue"
                onClick={() =>
                  navigate(`/tempahan/rsvp/${order.orderNumber}/${order._id}`, {
                    state: { order },
                  })
                }
              >
                <IoPeople className="mr-1" /> RSVP
              </Button>
            )}

            {/* Guestbook */}
            <Button
              size="xs"
              color="dark"
              onClick={() =>
                navigate(
                  `/tempahan/guestbook/${order.orderNumber}/${order._id}`,
                  { state: { order } }
                )
              }
            >
              <RiContactsBook3Line className="mr-1" /> Guestbook
            </Button>

            {/* Wishlist (Paris only, paid) */}
            {isParisAndPaid && (
              <Button
                size="xs"
                color="purple"
                onClick={() =>
                  navigate(
                    `/tempahan/wishlist/${order.orderNumber}/${order._id}`,
                    { state: { order } }
                  )
                }
              >
                <CiGift className="mr-1" /> Wishlist
              </Button>
            )}

            {/* Delete */}
            <Button
              size="xs"
              color="failure"
              onClick={() => onDelete(order._id)}
            >
              <MdOutlineDelete className="mr-1" /> Padam
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────── */
function RekodTempahanPage() {
  const { ready, user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && user) {
      const user_id = user._id;
      const timeoutId = setTimeout(() => {
        const fetchOrders = async () => {
          try {
            const response = await axios.get(`/api/orders/user/${user_id}`);
            setOrders(response.data);
          } catch (error) {
            console.error("Error fetching orders:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchOrders();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [ready, user]);

  const handleDelete = async () => {
    if (!selectedOrderId) return;
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.delete(
        `/api/orders/delete/${selectedOrderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message, {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
      setOrders((prev) => prev.filter((o) => o._id !== selectedOrderId));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Gagal memadam pesanan. Sila cuba lagi.", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
    }
  };

  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  if (ready && !user) return <Navigate to={"/login"} />;

  const formatDateToReadable = (isoDate) => {
    if (!isoDate) return "";
    return new Date(isoDate).toLocaleDateString("ms-MY", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const visibleOrders = orders.filter(
    (o) => o.paymentStatus !== "deleted"
  );

  return (
    <>
      <LoadingWrapper isLoading={loading}>
        <HeaderBackground H1="REKOD TEMPAHAN" P="" />

        <div style={S.page}>
          <div style={S.section}>
            {/* ── Summary bar ── */}
            <div style={S.summaryBar}>
              <span style={S.summaryText}>Senarai Pesanan Anda</span>
              <span style={S.summaryCount}>
                {visibleOrders.length}{" "}
                {visibleOrders.length === 1 ? "Pesanan" : "Pesanan"}
              </span>
            </div>

            {/* ── Order Cards ── */}
            {visibleOrders.length > 0 ? (
              visibleOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onDelete={openModal}
                  navigate={navigate}
                  formatDate={formatDateToReadable}
                />
              ))
            ) : (
              <div style={S.emptyState}>
                <div style={S.emptyIcon}>💌</div>
                <div style={S.emptyTitle}>Tiada Pesanan Dijumpai</div>
                <p style={S.emptyText}>
                  Anda belum membuat sebarang tempahan kad digital.
                </p>
                <button
                  onClick={() => navigate("/kad-digital")}
                  style={{
                    marginTop: "1rem",
                    padding: "0.6rem 1.5rem",
                    borderRadius: "999px",
                    border: "none",
                    background: "linear-gradient(135deg,#c9748f,#e8a598)",
                    color: "#fff",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Buat Tempahan Sekarang
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Delete Confirmation Modal ── */}
        <Modal show={isModalOpen} onClose={closeModal}>
          <Modal.Header>Sahkan Pemadaman</Modal.Header>
          <Modal.Body>
            Adakah anda pasti ingin memadam pesanan dan kad digital ini?
            Tindakan ini tidak boleh dibatalkan.
          </Modal.Body>
          <Modal.Footer>
            <Button color="failure" onClick={handleDelete}>
              Ya, Padam
            </Button>
            <Button color="gray" onClick={closeModal}>
              Batal
            </Button>
          </Modal.Footer>
        </Modal>
      </LoadingWrapper>
    </>
  );
}

export default RekodTempahanPage;
