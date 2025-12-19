// // ExampleComponent.jsx
// // Demonstrates usage of API functions: fetchFestivals and submitFilm
// // Shows festivals on mount and a form to submit a film

// import React, { useEffect, useState } from 'react';
// import { fetchFestivals, submitFilm } from '../api/api';

// const ExampleComponent = () => {
//   const [festivals, setFestivals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [form, setForm] = useState({ title: '', director: '', year: '' });
//   const [submitResult, setSubmitResult] = useState(null);

//   // Fetch festivals on mount
//   useEffect(() => {
//     let isMounted = true;
//     fetchFestivals().then(res => {
//       if (!isMounted) return;
//       if (res.error) setError(res.error.message);
//       else setFestivals(res.data || []);
//       setLoading(false);
//     });
//     // Set loading to true only on first render, outside effect
//     // (no-op)
//     return () => { isMounted = false; };
//   }, []);

//   // Handle form input changes
//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };


//   const handleSubmit = async e => {
//     e.preventDefault();
//     setSubmitResult(null);
//     setLoading(true);
//     // Call submitFilm API
//     const res = await submitFilm(form);
//     if (res.error) setSubmitResult('Error: ' + res.error.message);
//     else setSubmitResult('Film submitted!');
//     setLoading(false);
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: '2rem auto', padding: 20, border: '1px solid #ccc' }}>
//       <h2>Festivals</h2>
//       {/* Show loading or error */}
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {/* List festivals */}
//       <ul>
//         {festivals.map(f => (
//           <li key={f.id}>{f.name} ({f.year})</li>
//         ))}
//       </ul>
//       {/* Film submission form */}
//       <form onSubmit={handleSubmit}>
//         <input
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           name="director"
//           placeholder="Director"
//           value={form.director}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           name="year"
//           placeholder="Year"
//           value={form.year}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <button type="submit" disabled={loading}>Submit</button>
//       </form>
//       {/* Show result of submission */}
//       {submitResult && <p>{submitResult}</p>}
//     </div>
//   );
//     // removed stray closing ul
//     }
