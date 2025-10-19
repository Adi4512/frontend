// toast.js

import { useState, useEffect } from 'react';

export const Toast = ({ message, type = 'info', isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000); // Auto close after 5 seconds
            
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const getToastStyles = () => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-500/20',
                    border: 'border-green-400/30',
                    icon: '✅',
                    text: 'text-green-100'
                };
            case 'error':
                return {
                    bg: 'bg-red-500/20',
                    border: 'border-red-400/30',
                    icon: '❌',
                    text: 'text-red-100'
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-500/20',
                    border: 'border-yellow-400/30',
                    icon: '⚠️',
                    text: 'text-yellow-100'
                };
            default:
                return {
                    bg: 'bg-blue-500/20',
                    border: 'border-blue-400/30',
                    icon: 'ℹ️',
                    text: 'text-blue-100'
                };
        }
    };

    const styles = getToastStyles();

    return (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
            <div className={`
                ${styles.bg} ${styles.border}
                backdrop-blur-md bg-opacity-20
                border rounded-2xl shadow-2xl
                p-6 max-w-md min-w-[320px]
                relative overflow-hidden
            `}>
                {/* Glassmorphic background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{styles.icon}</span>
                            <h3 className={`text-lg font-semibold ${styles.text}`}>
                                Pipeline Analysis
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/70 hover:text-white transition-colors p-1"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* Message content */}
                    <div className={`text-sm ${styles.text} leading-relaxed`}>
                        {message}
                    </div>
                </div>

                {/* Animated progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 rounded-b-2xl overflow-hidden">
                    <div className="h-full bg-white/30 animate-progress-bar"></div>
                </div>
            </div>
        </div>
    );
};

// Toast hook for easy usage
export const useToast = () => {
    const [toast, setToast] = useState({
        isVisible: false,
        message: '',
        type: 'info'
    });

    const showToast = (message, type = 'info') => {
        setToast({
            isVisible: true,
            message,
            type
        });
    };

    const hideToast = () => {
        setToast(prev => ({ ...prev, isVisible: false }));
    };

    return {
        toast,
        showToast,
        hideToast
    };
};
