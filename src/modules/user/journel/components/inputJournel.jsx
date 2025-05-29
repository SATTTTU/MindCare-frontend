import { useJournalFormik } from "../formik/useJournelFormik";

export const JournalComponent = () => {
  // Initialize Formik hook with all submission handling
  const formik = useJournalFormik();

  const moods = [
    { emoji: '😊', label: 'happy', color: '#FFF3E0' },
    { emoji: '😌', label: 'calm', color: '#E3F2FD' },
    { emoji: '😐', label: 'neutral', color: '#F5F5F5' },
    { emoji: '😢', label: 'sad', color: '#E1F5FE' },
    { emoji: '😠', label: 'angry', color: '#FFEBEE' },
    { emoji: '😰', label: 'anxious', color: '#F3E5F5' },
    { emoji: '😴', label: 'tired', color: '#E8EAF6' },
    { emoji: '🤗', label: 'grateful', color: '#FCE4EC' }
  ];

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
      marginBottom: '24px'
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
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
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
    inputField: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #E0E0E0',
      borderRadius: '8px',
      fontSize: '1rem',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 0.2s ease-in-out',
      marginBottom: '16px'
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
      lineHeight: '1.5'
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
    errorText: {
      color: '#f44336',
      fontSize: '0.875rem',
      marginTop: '4px',
      marginBottom: '16px'
    },
    characterCount: {
      textAlign: 'right', 
      fontSize: '0.875rem', 
      color: '#757575', 
      marginTop: '8px'
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
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
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

        <form onSubmit={formik.handleSubmit}>
          <div>
            <h2 style={styles.sectionTitle}>Title</h2>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Give your journal entry a title"
              style={{
                ...styles.inputField,
                borderColor: formik.errors.title ? '#f44336' : 
                          formik.values.title ? '#2196F3' : '#E0E0E0'
              }}
            />
            {formik.errors.title && formik.touched.title && (
              <div style={styles.errorText}>{formik.errors.title}</div>
            )}
          </div>

          <div>
            <h2 style={styles.sectionTitle}>Select your mood</h2>
            <div style={styles.moodGrid} className="mood-grid">
              {moods.map((mood, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => formik.setFieldValue('mood', mood.label)}
                  style={{
                    ...styles.moodButton,
                    backgroundColor: mood.color,
                    transform: formik.values.mood === mood.label ? 'translateY(-2px) scale(1.05)' : 'none',
                    boxShadow: formik.values.mood === mood.label 
                      ? '0 4px 16px rgba(33, 150, 243, 0.3), 0 0 0 2px #2196F3' 
                      : '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <span style={styles.moodEmoji}>{mood.emoji}</span>
                  <div style={styles.moodLabel}>{mood.label.charAt(0).toUpperCase() + mood.label.slice(1)}</div>
                </button>
              ))}
            </div>
            {formik.errors.mood && formik.touched.mood && (
              <div style={styles.errorText}>{formik.errors.mood}</div>
            )}
          </div>

          <div>
            <h2 style={styles.sectionTitle}>Share your thoughts</h2>
            <textarea
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="What's on your mind today? How was your day? What are you grateful for? Write freely..."
              style={{
                ...styles.textarea,
                borderColor: formik.errors.content ? '#f44336' : 
                            formik.values.content ? '#2196F3' : '#E0E0E0'
              }}
            />
            <div style={styles.characterCount}>
              {formik.values.content.length} characters
            </div>
            {formik.errors.content && formik.touched.content && (
              <div style={styles.errorText}>{formik.errors.content}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            style={{
              ...styles.saveButton,
              ...(formik.isSubmitting ? styles.saveButtonDisabled : {}),
            }}
          >
            {formik.isSubmitting ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '8px'
                }}></div>
                Saving...
              </>
            ) : (
              'Save Entry'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};