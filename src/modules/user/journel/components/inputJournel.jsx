import React, { useState } from 'react';



 export const JournalComponent = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Happy', color: '#FFF3E0' },
    { emoji: '😌', label: 'Calm', color: '#E3F2FD' },
    { emoji: '😐', label: 'Neutral', color: '#F5F5F5' },
    { emoji: '😢', label: 'Sad', color: '#E1F5FE' },
    { emoji: '😠', label: 'Angry', color: '#FFEBEE' },
    { emoji: '😰', label: 'Anxious', color: '#F3E5F5' },
    { emoji: '😴', label: 'Tired', color: '#E8EAF6' },
    { emoji: '🤗', label: 'Grateful', color: '#FCE4EC' }
  ];

  const handleSaveEntry = async () => {
    if (!selectedMood && !journalEntry.trim()) {
      return;
    }

    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Material Design inspired styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '24px 16px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    mainCard: {
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      marginBottom: '24px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '48px'
    },
    headerIcon: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      boxShadow: '0 4px 16px rgba(33, 150, 243, 0.3)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '300',
      color: '#424242',
      marginBottom: '8px',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#757575',
      fontWeight: '400'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '500',
      color: '#424242',
      marginBottom: '16px'
    },
    moodGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
      gap: '12px',
      marginBottom: '48px'
    },
    moodButton: {
      border: 'none',
      borderRadius: '12px',
      padding: '16px 8px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      position: 'relative',
      outline: 'none',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
      }
    },
    moodEmoji: {
      fontSize: '2rem',
      marginBottom: '8px',
      display: 'block'
    },
    moodLabel: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#424242'
    },
    textareaContainer: {
      marginBottom: '32px'
    },
    textarea: {
      width: '100%',
      minHeight: '200px',
      padding: '16px',
      border: '2px solid #E0E0E0',
      borderRadius: '8px',
      fontSize: '1rem',
      fontFamily: 'inherit',
      resize: 'vertical',
      outline: 'none',
      transition: 'border-color 0.2s ease-in-out',
      lineHeight: '1.5',
      backgroundColor: '#fafafa'
    },
    saveButton: {
      backgroundColor: '#2196F3',
      color: 'white',
      border: 'none',
      borderRadius: '24px',
      padding: '12px 32px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      boxShadow: '0 4px 16px rgba(33, 150, 243, 0.3)',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto'
    },
    saveButtonDisabled: {
      backgroundColor: '#BDBDBD',
      cursor: 'not-allowed',
      boxShadow: 'none'
    },
    successSnackbar: {
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '24px',
      boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)',
      display: 'flex',
      alignItems: 'center',
      animation: 'fadeIn 0.3s ease-in-out'
    },
    tipCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #E0E0E0',
      maxWidth: '800px',
      margin: '0 auto'
    },
    tipHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '8px'
    },
    tipIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#E3F2FD',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px',
      flexShrink: 0
    },
    tipTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: '#424242',
      marginBottom: '8px'
    },
    tipText: {
      fontSize: '0.875rem',
      color: '#757575',
      lineHeight: '1.5'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
          @media (max-width: 768px) {
            .mood-grid {
              grid-template-columns: repeat(4, 1fr);
            }
            .title {
              font-size: 2rem !important;
            }
            .main-card {
              padding: 24px !important;
            }
          }
        `}
      </style>

      <div style={styles.mainCard} className="main-card">
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <span style={{ fontSize: '1.5rem', color: 'white' }}>✨</span>
          </div>
          <h1 style={styles.title} className="title">
            How are you feeling today?
          </h1>
          <p style={styles.subtitle}>
            {getCurrentDate()}
          </p>
        </div>

        <div>
          <h2 style={styles.sectionTitle}>Select your mood</h2>
          <div style={styles.moodGrid} className="mood-grid">
            {moods.map((mood, index) => (
              <button
                key={index}
                onClick={() => setSelectedMood(mood.label)}
                style={{
                  ...styles.moodButton,
                  backgroundColor: mood.color,
                  transform: selectedMood === mood.label ? 'translateY(-2px) scale(1.05)' : 'none',
                  boxShadow: selectedMood === mood.label 
                    ? '0 4px 16px rgba(33, 150, 243, 0.3), 0 0 0 2px #2196F3' 
                    : '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  if (selectedMood !== mood.label) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedMood !== mood.label) {
                    e.target.style.transform = 'none';
                    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                <span style={styles.moodEmoji}>{mood.emoji}</span>
                <div style={styles.moodLabel}>{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={styles.textareaContainer}>
          <h2 style={styles.sectionTitle}>Share your thoughts</h2>
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="What's on your mind today? How was your day? What are you grateful for? Write freely..."
            style={{
              ...styles.textarea,
              borderColor: journalEntry ? '#2196F3' : '#E0E0E0'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2196F3';
              e.target.style.boxShadow = '0 0 0 2px rgba(33, 150, 243, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = journalEntry ? '#2196F3' : '#E0E0E0';
              e.target.style.boxShadow = 'none';
            }}
          />
          <div style={{ 
            textAlign: 'right', 
            fontSize: '0.875rem', 
            color: '#757575', 
            marginTop: '8px' 
          }}>
            {journalEntry.length} characters
          </div>
        </div>

        <button
          onClick={handleSaveEntry}
          disabled={isSaving || (!selectedMood && !journalEntry.trim())}
          style={{
            ...styles.saveButton,
            ...((!selectedMood && !journalEntry.trim()) ? styles.saveButtonDisabled : {}),
            transform: (!selectedMood && !journalEntry.trim()) ? 'none' : 'scale(1)',
          }}
          onMouseEnter={(e) => {
            if (!e.target.disabled) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.backgroundColor = '#1976D2';
            }
          }}
          onMouseLeave={(e) => {
            if (!e.target.disabled) {
              e.target.style.transform = 'scale(1)';
              e.target.style.backgroundColor = '#2196F3';
            }
          }}
        >
          {isSaving ? (
            <>
              <div style={styles.spinner}></div>
              Saving...
            </>
          ) : (
            'Save Entry'
          )}
        </button>
      </div>

      {showSuccess && (
        <div style={styles.successSnackbar}>
          <span style={{ marginRight: '8px', fontSize: '1.25rem' }}>✓</span>
          Entry saved successfully!
        </div>
      )}

      <div style={styles.tipCard}>
        <div style={styles.tipHeader}>
          <div style={styles.tipIcon}>
            <span style={{ fontSize: '1rem' }}>💡</span>
          </div>
          <div>
            <h3 style={styles.tipTitle}>Daily Tip</h3>
            <p style={styles.tipText}>
              Regular journaling can help improve your mental clarity and emotional well-being. 
              Try to write for just 5 minutes each day to build a healthy habit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
