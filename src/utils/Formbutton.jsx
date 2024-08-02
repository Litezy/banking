import React from 'react'

export default function Formbutton({ type = "submit", label, loading }) {
    return (
        <div>
            <button 
            disabled={loading ? true : false}
            className={`
            ${loading ? 'cursor-not-allowed' : ''}
            w-full relative py-3.5 px-5 rounded-lg bg-gradient-to-tr from-primary to-purple-700 text-white
            `} type={type}>
                {label}
               {loading && <div className="btn-spinner center">
                    <div className="btn-spinner-blade"></div>
                    <div className="btn-spinner-blade"></div>
                    <div className="btn-spinner-blade"></div>
                    <div className="btn-spinner-blade"></div>
                    <div className="btn-spinner-blade"></div>
                    <div className="btn-spinner-blade"></div>
                    <div className="btn-spinner-blade"></div>
                    <div className="btn-spinner-blade"></div>
                    <div className="btn-spinner-blade"></div>
                    <div className="btn-spinner-blade"></div>
                    <div className="btn-spinner-blade"></div>
                    <div className="btn-spinner-blade"></div>
                </div>}
            </button>
        </div>
    )
}
