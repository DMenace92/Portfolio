import React, { useEffect, useState } from 'react'
import styles from './WorkHistoryManager.module.css'

const API_URL = process.env.REACT_APP_API_URL

// Upload a company logo to the backend, which stores it in Appwrite Storage and returns its URL.
const uploadLogo = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/create_work_logo`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('authToken')}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Logo upload failed')
  }

  const data = await response.json()
  return data.url
}

const emptyEntry = {
  company: '',
  jobTitle: '',
  startDate: '',
  endDate: '',
  summary: '',
  logo: '',
  order: 0,
}

const WorkHistoryManager = (props) => {
  const {
    entries,
    fetchWorkHistory,
    createWorkHistory,
    updateWorkHistory,
    deleteWorkHistory,
  } = props

  const [form, setForm] = useState(emptyEntry)
  const [editingId, setEditingId] = useState(null)
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (fetchWorkHistory) {
      fetchWorkHistory()
    }
  }, [fetchWorkHistory])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(emptyEntry)
    setEditingId(null)
    setFile(null)
  }

  const startEdit = (entry) => {
    setForm({
      company: entry.company || '',
      jobTitle: entry.jobTitle || '',
      startDate: entry.startDate || '',
      endDate: entry.endDate || '',
      summary: entry.summary || '',
      logo: entry.logo || '',
      order: entry.order ?? 0,
    })
    setEditingId(entry._id)
    setFile(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      let logo = form.logo
      if (file) {
        logo = await uploadLogo(file)
      }

      const payload = { ...form, logo, order: Number(form.order) || 0 }

      if (editingId) {
        await updateWorkHistory(editingId, payload)
      } else {
        await createWorkHistory(payload)
      }
      resetForm()
    } catch (err) {
      console.error('Failed to save work history entry', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this work history entry?')) {
      deleteWorkHistory(id)
      if (editingId === id) resetForm()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formColumn}>
        <h2>{editingId ? 'Edit Work Experience' : 'Add Work Experience'}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            Company
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
            />
          </label>

          <label className={styles.field}>
            Job Title
            <input
              type="text"
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              required
            />
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              Start Date
              <input
                type="text"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                placeholder="Feb 2025"
              />
            </label>
            <label className={styles.field}>
              End Date
              <input
                type="text"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                placeholder="present"
              />
            </label>
          </div>

          <label className={styles.field}>
            Summary
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows="5"
            />
          </label>

          <label className={styles.field}>
            Display Order
            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
            />
          </label>

          <label className={styles.field}>
            Company Logo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {(file || form.logo) && (
              <img
                className={styles.logoPreview}
                src={file ? URL.createObjectURL(file) : form.logo}
                alt="logo preview"
              />
            )}
          </label>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={submitting}
            >
              {submitting
                ? 'Saving…'
                : editingId
                  ? 'Update Entry'
                  : 'Add Entry'}
            </button>
            {editingId && (
              <button
                type="button"
                className={styles.cancelButton}
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.listColumn}>
        <h2>Work History</h2>
        {entries && entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry._id} className={styles.entryCard}>
              {entry.logo ? (
                <img
                  className={styles.entryLogo}
                  src={entry.logo}
                  alt={entry.company}
                />
              ) : null}
              <div className={styles.entryBody}>
                <p className={styles.entryCompany}>
                  {entry.company}{' '}
                  <span className={styles.entryDates}>
                    ({entry.startDate}
                    {entry.endDate ? ` - ${entry.endDate}` : ''})
                  </span>
                </p>
                <p className={styles.entryTitle}>{entry.jobTitle}</p>
                <p className={styles.entrySummary}>{entry.summary}</p>
                <div className={styles.entryActions}>
                  <button onClick={() => startEdit(entry)}>Edit</button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(entry._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No work history yet. Add your first entry.</p>
        )}
      </div>
    </div>
  )
}

export default WorkHistoryManager
