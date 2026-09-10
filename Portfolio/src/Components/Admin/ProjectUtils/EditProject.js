import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Styles from './EditProject.module.css'
import { fetchProjectById } from '../../../Actions/ProjectAction'

const API_URL = process.env.REACT_APP_API_URL || ''

// Upload a file to the backend, which stores it in Appwrite Storage and returns its public URL.
const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/create_image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('authToken')}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Image upload failed')
  }

  const data = await response.json()
  return data.url
}

const EditProject = (props) => {
  const { proID } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    links: [{ url: '', label: '' }],
    features: [''],
    techUsed: [''],
    images: [{ link: '', description: '' }],
    videos: [{ link: '', description: '' }],
    description: '',
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const project = await fetchProjectById(proID)
        if (!active || !project) return
        setFormData({
          title: project.title || '',
          links:
            project.links && project.links.length
              ? project.links
              : [{ url: '', label: '' }],
          features:
            project.features && project.features.length
              ? project.features
              : [''],
          techUsed:
            project.techUsed && project.techUsed.length
              ? project.techUsed
              : [''],
          images:
            project.image && project.image.length
              ? project.image
              : [{ link: '', description: '' }],
          videos:
            project.video && project.video.length
              ? project.video
              : [{ link: '', description: '' }],
          description: project.description || '',
        })
      } catch (err) {
        console.error('Failed to load project', err)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [proID])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith('techUsed')) {
      const index = parseInt(name.split('[')[1].split(']')[0])
      const techUsed = [...formData.techUsed]
      techUsed[index] = value
      setFormData({ ...formData, techUsed })
    } else if (name.startsWith('features')) {
      const index = parseInt(name.split('[')[1].split(']')[0])
      const features = [...formData.features]
      features[index] = value
      setFormData({ ...formData, features })
    } else if (name.startsWith('links')) {
      const index = parseInt(name.split('[')[1].split(']')[0])
      const links = [...formData.links]
      links[index][name.split('.')[1]] = value
      setFormData({ ...formData, links })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleImageField = (index, field, value) => {
    const images = [...formData.images]
    images[index] = { ...images[index], [field]: value }
    setFormData({ ...formData, images })
  }

  const handleVideoField = (index, field, value) => {
    const videos = [...formData.videos]
    videos[index] = { ...videos[index], [field]: value }
    setFormData({ ...formData, videos })
  }

  const addTechnology = () => {
    setFormData({ ...formData, techUsed: [...formData.techUsed, ''] })
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { url: '', label: '' }],
    })
  }

  const addImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, { link: '', description: '' }],
    })
  }

  const addVideo = () => {
    setFormData({
      ...formData,
      videos: [...formData.videos, { link: '', description: '' }],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSaved(false)

    try {
      let images = formData.images
      if (file) {
        const url = await uploadImage(file)
        images = images.map((img, index) =>
          index === 0 ? { ...img, link: url } : img
        )
      }

      const projectData = {
        title: formData.title,
        techUsed: formData.techUsed,
        links: formData.links,
        features: formData.features,
        images,
        videos: formData.videos,
        description: formData.description,
      }

      await props.updateProject(proID, projectData)
      setFile(null)
      setSaved(true)
    } catch (err) {
      console.error('Failed to update project', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className={Styles.projectHolderArea}>Loading project…</div>
  }

  return (
    <div className={Styles.projectHolderArea}>
      <div className={Styles.projectCreateMainContainer}>
        <div className={Styles.scrollFormFix}>
          <form className={Styles.projectCreateForm} onSubmit={handleSubmit}>
            <label className={Styles.editProjectLabel}>
              Project Name:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>

            <label className={Styles.editProjectLabel}>
              Project Links:
              <div>
                {formData.links.map((link, index) => (
                  <div key={index} className={Styles.linkGroup}>
                    <input
                      type="text"
                      name={`links[${index}].url`}
                      value={link.url}
                      onChange={handleChange}
                      placeholder="URL"
                    />
                    <input
                      type="text"
                      name={`links[${index}].label`}
                      value={link.label}
                      onChange={handleChange}
                      placeholder="Label"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLink}
                  className={Styles.addButton}
                >
                  Add Another Link
                </button>
              </div>
            </label>

            <label className={Styles.editProjectLabel}>
              Project Features:
              <div>
                {formData.features.map((feature, index) => (
                  <div key={index} className={Styles.featureGroup}>
                    <input
                      type="text"
                      name={`features[${index}]`}
                      value={feature}
                      onChange={handleChange}
                      placeholder={`Feature ${index + 1}`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className={Styles.addButton}
                >
                  Add Another Feature
                </button>
              </div>
            </label>

            <label className={Styles.editProjectLabel}>
              Project Technologies:
              <div>
                {formData.techUsed.map((technology, index) => (
                  <div key={index} className={Styles.technologyGroup}>
                    <input
                      type="text"
                      name={`techUsed[${index}]`}
                      value={technology}
                      onChange={handleChange}
                      placeholder={`Technology ${index + 1}`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTechnology}
                  className={Styles.addButton}
                >
                  Add Another Technology
                </button>
              </div>
            </label>

            <label className={Styles.editProjectLabel}>
              Images:
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              {file ? (
                <span className={Styles.fileHint}>
                  New file selected: {file.name} (replaces first image)
                </span>
              ) : null}
              <div>
                {formData.images.map((image, index) => (
                  <div key={index} className={Styles.mediaGroup}>
                    <input
                      type="text"
                      value={image.link}
                      placeholder="Image link"
                      onChange={(e) =>
                        handleImageField(index, 'link', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={image.description}
                      placeholder="Description"
                      onChange={(e) =>
                        handleImageField(index, 'description', e.target.value)
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImage}
                  className={Styles.addButton}
                >
                  Add Another Image
                </button>
              </div>
            </label>

            <label className={Styles.editProjectLabel}>
              Videos:
              <div>
                {formData.videos.map((video, index) => (
                  <div key={index} className={Styles.mediaGroup}>
                    <input
                      type="text"
                      value={video.link}
                      placeholder="Video link"
                      onChange={(e) =>
                        handleVideoField(index, 'link', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={video.description}
                      placeholder="Description"
                      onChange={(e) =>
                        handleVideoField(index, 'description', e.target.value)
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVideo}
                  className={Styles.addButton}
                >
                  Add Another Video
                </button>
              </div>
            </label>

            <label className={Styles.editProjectLabel}>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Project Description"
              />
            </label>

            <button
              type="submit"
              className={Styles.submitButton}
              disabled={submitting}
            >
              {submitting ? 'Saving…' : 'Save Changes'}
            </button>
            {saved ? <span className={Styles.savedHint}>Saved!</span> : null}
          </form>
        </div>
      </div>
      <div className={Styles.projectViewArea}>
        <h6 className={Styles.sectionTitle}>Project Name: {formData.title}</h6>
        <h6 className={Styles.sectionTitle}>Project Links:</h6>
        {formData.links.map((link, index) => (
          <div key={index} className={Styles.linkPreview}>
            <p>URL: {link.url}</p>
            <p>Label: {link.label}</p>
          </div>
        ))}
        <h6 className={Styles.sectionTitle}>
          Project Technologies: {formData.techUsed.join(', ')}
        </h6>
        <h6 className={Styles.sectionTitle}>
          Project Features: {formData.features.join(', ')}
        </h6>
        <h6 className={Styles.sectionTitle}>
          Description: {formData.description}
        </h6>
      </div>
    </div>
  )
}

export default EditProject
