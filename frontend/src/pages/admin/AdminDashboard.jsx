import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminListProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct } from '../../api.js';
import { clearAdminToken } from '../../adminAuth.js';

const EMPTY_FORM = { name: '', description: '', price: '', image: null };

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function load() {
    setStatus('loading');
    adminListProducts()
      .then((data) => {
        setProducts(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }

  useEffect(load, []);

  function handleLogout() {
    clearAdminToken();
    navigate('/admin/login');
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({ name: product.name, description: product.description || '', price: product.price, image: null });
  }

  function startCreate() {
    setEditingId('new');
    setForm(EMPTY_FORM);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price);
    if (form.image) data.append('image', form.image);

    try {
      if (editingId === 'new') {
        await adminCreateProduct(data);
      } else {
        await adminUpdateProduct(editingId, data);
      }
      cancelEdit();
      load();
    } catch {
      alert('Could not save product. Please check the details and try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return;
    await adminDeleteProduct(id);
    load();
  }

  return (
    <div className="admin-wrap">
      <div className="admin-head">
        <h1>Product Management</h1>
        <div>
          <button className="btn-secondary" onClick={startCreate}>+ New Product</button>
          <button className="btn-secondary" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      {editingId && (
        <form className="admin-form" onSubmit={handleSave}>
          <h3>{editingId === 'new' ? 'New Product' : 'Edit Product'}</h3>
          <div className="form-grp">
            <label>Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required/>
          </div>
          <div className="form-grp">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}/>
          </div>
          <div className="form-grp">
            <label>Price (Rs.)</label>
            <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required/>
          </div>
          <div className="form-grp">
            <label>Image</label>
            <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })}/>
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
            <button type="button" className="btn-secondary" onClick={cancelEdit}>Cancel</button>
          </div>
        </form>
      )}

      {status === 'loading' && <p className="status-msg">Loading products…</p>}
      {status === 'error' && <p className="status-msg">Could not load products.</p>}

      {status === 'ready' && (
        <table className="admin-table">
          <thead><tr><th>Image</th><th>Name</th><th>Price</th><th></th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td><img src={p.image_url || 'https://placehold.co/60x60?text=—'} alt={p.name} className="admin-thumb"/></td>
                <td>{p.name}</td>
                <td>Rs. {Number(p.price).toLocaleString()}.00</td>
                <td>
                  <button className="btn-link" onClick={() => startEdit(p)}>Edit</button>
                  <button className="btn-link danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
