import { Fragment, useEffect, useState } from 'react';
import {
  adminGetPhoneNumber,
  adminUpdatePhoneNumber,
  adminChangePassword,
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
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [status, setStatus] = useState('loading');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesStatus, setCategoriesStatus] = useState('loading');
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesStatus, setSubCategoriesStatus] = useState('ready');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [savedPhoneNumber, setSavedPhoneNumber] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneStatus, setPhoneStatus] = useState('loading');
  const [phoneError, setPhoneError] = useState('');
  const [savingPhone, setSavingPhone] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

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
        setSavedPhoneNumber(savedPhone || '');
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
      setSavedPhoneNumber(saved.phoneNumber);
      setIsEditingPhone(false);
    } catch {
      setPhoneError('Could not save the phone number. Please try again.');
    } finally {
      setSavingPhone(false);
    }
  }

  function cancelPhoneEdit() {
    setPhoneNumber(savedPhoneNumber);
    setPhoneError('');
    setIsEditingPhone(false);
  }

  async function handlePasswordSave(e) {
    e.preventDefault();
    setPasswordError('');
    setPasswordMessage('');
    if (passwordForm.next.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordError('New password and confirm password must match.');
      return;
    }
    setSavingPassword(true);
    try {
      await adminChangePassword(passwordForm.current, passwordForm.next);
      setPasswordForm({ current: '', next: '', confirm: '' });
      setIsEditingPassword(false);
      setPasswordMessage('Admin password has been updated.');
    } catch {
      setPasswordError('Could not update the password. Check your current password and try again.');
    } finally {
      setSavingPassword(false);
    }
  }

  function cancelPasswordEdit() {
    setPasswordForm({ current: '', next: '', confirm: '' });
    setPasswordError('');
    setPasswordMessage('');
    setIsEditingPassword(false);
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

  function toggleDescription(id) {
    setExpandedDescriptions((current) => ({ ...current, [id]: !current[id] }));
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
            {isEditingPhone ? (
              <>
                <div className="form-grp">
                  <label htmlFor="admin-phone-number">Phone Number</label>
                  <input
                    id="admin-phone-number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+947xxxxxxxx"
                    pattern="\\+94[0-9]{9}"
                    maxLength={12}
                    required
                    autoFocus
                  />
                </div>
                {phoneError && <p className="form-error">{phoneError}</p>}
                <div className="admin-phone-actions">
                  <button type="submit" className="btn-primary" disabled={savingPhone}>
                    {savingPhone ? 'Saving…' : 'Save Phone Number'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={cancelPhoneEdit} disabled={savingPhone}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="form-grp">
                <label>Phone Number</label>
                <div className="admin-phone-display">
                  <span>{savedPhoneNumber || 'Not set'}</span>
                  <button
                    type="button"
                    className="icon-action-btn edit-icon-btn"
                    aria-label="Edit WhatsApp contact number"
                    title="Edit phone number"
                    onClick={() => {
                      setPhoneError('');
                      setIsEditingPhone(true);
                    }}
                  >
                    <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4z"/></svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </form>
      <form className="admin-form" onSubmit={handlePasswordSave}>
        <h3>Admin Password</h3>
        {passwordMessage && <p className="order-action-message" role="status">{passwordMessage}</p>}
        {isEditingPassword ? (
          <>
            <div className="form-grp">
              <label htmlFor="current-admin-password">Current Password</label>
              <input
                id="current-admin-password"
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                placeholder="Enter your current password"
                autoComplete="current-password"
                required
                autoFocus
              />
            </div>
            <div className="form-grp">
              <label htmlFor="new-admin-password">New Password</label>
              <input
                id="new-admin-password"
                type="password"
                value={passwordForm.next}
                onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            <div className="form-grp">
              <label htmlFor="confirm-admin-password">Confirm New Password</label>
              <input
                id="confirm-admin-password"
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                placeholder="Re-enter your new password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            {passwordError && <p className="form-error">{passwordError}</p>}
            <div className="admin-phone-actions">
              <button type="submit" className="btn-primary" disabled={savingPassword}>
                {savingPassword ? 'Updating…' : 'Update Password'}
              </button>
              <button type="button" className="btn-secondary" onClick={cancelPasswordEdit} disabled={savingPassword}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="admin-phone-display">
            <span>Password is set</span>
            <button
              type="button"
              className="icon-action-btn edit-icon-btn"
              aria-label="Edit admin password"
              title="Edit admin password"
              onClick={() => {
                setPasswordError('');
                setPasswordMessage('');
                setIsEditingPassword(true);
              }}
            >
              <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4z"/></svg>
            </button>
          </div>
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
        <div className="admin-table-wrap">
          <table className="admin-table product-admin-table">
            <thead>
              <tr>
                <th aria-label="Description controls"></th>
                <th>Image</th>
                <th>Name</th>
                <th>Product Category</th>
                <th>Product Sub Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const isDescriptionExpanded = Boolean(expandedDescriptions[p.id]);
                return (
                  <Fragment key={p.id}>
                    <tr>
                      <td>
                        {p.description ? (
                          <button
                            type="button"
                            className="description-expand-btn"
                            onClick={() => toggleDescription(p.id)}
                            aria-label={`${isDescriptionExpanded ? 'Hide' : 'Show'} description for ${p.name}`}
                            aria-expanded={isDescriptionExpanded}
                            title={isDescriptionExpanded ? 'Hide description' : 'Show description'}
                          >
                            {isDescriptionExpanded ? '−' : '+'}
                          </button>
                        ) : '—'}
                      </td>
                      <td><img src={p.image_url || 'https://placehold.co/60x60?text=—'} alt={p.name} className="admin-thumb"/></td>
                      <td>{p.name}</td>
                      <td>{p.category_name || '—'}</td>
                      <td>{p.sub_category_name || '—'}</td>
                      <td>Rs. {Number(p.price).toLocaleString()}.00</td>
                      <td>
                        <button className="btn-link" onClick={() => startEdit(p)}>Edit</button>
                        <button className="btn-link danger" onClick={() => handleDelete(p.id)}>Delete</button>
                      </td>
                    </tr>
                    {isDescriptionExpanded && (
                      <tr className="product-description-row">
                        <td colSpan={7}>
                          <div className="product-description-details">
                            <strong>Description</strong>
                            <p>{p.description}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
