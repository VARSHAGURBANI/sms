// src/components/DocumentForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DocumentForm.css';

const DocumentForm = ({ document, onSuccess }) => {
    const [formData, setFormData] = useState({
        DocumentID: document?.DocumentID || '',
        ApplicationID: document?.ApplicationID || '',
        DocumentType: document?.DocumentType || '',
        FilePath: document?.FilePath || ''
    });

    useEffect(() => {
        if (document) {
            setFormData({
                DocumentID: document.DocumentID,
                ApplicationID: document.ApplicationID,
                DocumentType: document.DocumentType,
                FilePath: document.FilePath
            });
        }
    }, [document]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (document) {
                // Edit existing document
                await axios.put(`/api/documents/${document._id}`, formData);
            } else {
                // Create new document
                await axios.post('/api/documents', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="document-form">
            <h1>{document ? 'Edit Document' : 'Add Document'}</h1>
            <form onSubmit={handleSubmit}>
                <label>Document ID:</label>
                <input type="text" name="DocumentID" value={formData.DocumentID} onChange={handleChange} required />

                <label>Application ID:</label>
                <input type="text" name="ApplicationID" value={formData.ApplicationID} onChange={handleChange} required />

                <label>Document Type:</label>
                <input type="text" name="DocumentType" value={formData.DocumentType} onChange={handleChange} required />

                <label>File Path:</label>
                <input type="text" name="FilePath" value={formData.FilePath} onChange={handleChange} required />

                <button type="submit">{document ? 'Update Document' : 'Add Document'}</button>
            </form>
        </div>
    );
};

export default DocumentForm;
