import { useEffect, useState } from 'react';
import {
  adminGetPhoneNumber,
  adminUpdatePhoneNumber,
  adminListProductCategories,
  adminListProductSubCategories,
  adminListProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} from '../../api.js';
import AdminNav from '../../components/AdminNav.jsx';

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  categoryId: '',
  subCategoryId: '',
  image: null,
};
const PHONE_PATTERN = /^\+94\d{9}$/;

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesStatus, setCategoriesStatus] = useState('loading');
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesStatus, setSubCategoriesStatus] = useState('ready');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneStatus, setPhoneStatus] = useState('loading');
  const [phoneError, setPhoneError] = useState('');
  const [savingPhone, setSavingPhone] = useState(false);

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

  useEffect(() => {
    adminListProductCategories()
      .then((data) => {
        setCategories(data);
        setCategoriesStatus('ready');
      })
      .catch(() => setCategoriesStatus('error'));
  }, []);

  useEffect(() => {
    adminGetPhoneNumber()
      .then(({ phoneNumber: savedPhone }) => {
        setPhoneNumber(savedPhone || '');
        setPhoneStatus('ready');
      })
      .catch(() => setPhoneStatus('error'));
  }, []);

  async function handlePhoneSave(e) {
    e.preventDefault();
    if (!PHONE_PATTERN.test(phoneNumber.trim())) {
      setPhoneError('Use +947xxxxxxxx.');
      return;
    }
    setPhoneError('');
    setSavingPhone(true);
    try {
      const saved = await adminUpdatePhoneNumber(phoneNumber.trim());
      setPhoneNumber(saved.phoneNumber);
    } catch {
      setPhoneError('Could not save the phone number. Please try again.');
    } finally {
      setSavingPhone(false);
    }
  }

  async function loadSubCategories(categoryId, selectedSubCategoryId = '') {
    if (!categoryId) {
      setSubCategories([]);
      setSubCategoriesStatus('ready');
      return;
    }
    setSubCategoriesStatus('loading');
    try {
      const data = await adminListProductSubCategories(categoryId);
      setSubCategories(data);
      setSubCategoriesStatus('ready');
      setForm((current) => ({ ...current, subCategoryId: String(selectedSubCategoryId || '') }));
    } catch {
      setSubCategories([]);
      setSubCategoriesStatus('error');
    }
  }

  function handleCategoryChange(categoryId) {
    setForm((current) => ({ ...current, categoryId, subCategoryId: '' }));
    loadSubCategories(categoryId);
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      categoryId: String(product.category_id || ''),
      subCategoryId: String(product.sub_category_id || ''),
      image: null,
    });
    setSubCategories([]);
    loadSubCategories(product.category_id, product.sub_category_id);
  }

  function startCreate() {
    setEditingId('new');
    setForm({ ...EMPTY_FORM });
    setSubCategories([]);
    setSubCategoriesStatus('ready');
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setSubCategories([]);
    setSubCategoriesStatus('ready');
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('category_id', form.categoryId);
    data.append('sub_category_id', form.subCategoryId);
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
      <AdminNav />
      <form className="admin-form" onSubmit={handlePhoneSave}>
        <h3>WhatsApp Contact Number</h3>
        {phoneStatus === 'loading' && <p>Loading phone number…</p>}
        {phoneStatus === 'error' && <p className="form-error">Could not load the phone number.</p>}
        {phoneStatus === 'ready' && (
          <>
            <div className="form-grp">
              <label htmlFor="admin-phone-number">Phone Number</label>
              <input
                id="admin-phone-number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+947xxxxxxxx"
                pattern="\+94[0-9]{9}"
                maxLength={12}
                required
              />
            </div>
            {phoneError && <p className="form-error">{phoneError}</p>}
            <button type="submit" className="btn-primary" disabled={savingPhone}>
              {savingPhone ? 'Saving…' : 'Save Phone Number'}
            </button>
          </>
        )}
      </form>
      <div className="admin-head">
        <h1>Product Management</h1>
        <div>
          <button className="btn-secondary" onClick={startCreate}>+ New Product</button>
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
            <label htmlFor="product-category">Product Category</label>
            <select
              id="product-category"
              value={form.categoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={categoriesStatus !== 'ready'}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.product_category}</option>
              ))}
            </select>
            {categoriesStatus === 'loading' && <p className="phone-hint">Loading categories…</p>}
            {categoriesStatus === 'error' && <p className="form-error">Could not load product categories.</p>}
            {categoriesStatus === 'ready' && categories.length === 0 && (
              <p className="form-error">No product categories are available.</p>
            )}
          </div>
          <div className="form-grp">
            <label htmlFor="product-sub-category">Product Sub Category</label>
            <select
              id="product-sub-category"
              value={form.subCategoryId}
              onChange={(e) => setForm({ ...form, subCategoryId: e.target.value })}
              disabled={!form.categoryId || subCategoriesStatus !== 'ready'}
              required
            >
              <option value="">Select a subcategory</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>{subCategory.sub_category}</option>
              ))}
            </select>
            {subCategoriesStatus === 'loading' && <p className="phone-hint">Loading subcategories…</p>}
            {subCategoriesStatus === 'error' && <p className="form-error">Could not load subcategories.</p>}
            {form.categoryId && subCategoriesStatus === 'ready' && subCategories.length === 0 && (
              <p className="phone-hint">No subcategories are available for this category.</p>
            )}
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
