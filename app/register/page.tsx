
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const [dob, setDob] = useState('');
  const [citizenship, setCitizenship] = useState('Malaysian');

  const age =
    dob ? new Date().getFullYear() - new Date(dob).getFullYear() : '';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const ic = formData.get('ic_passport') as string;

    if (citizenship === 'Malaysian' && !/^\d{12}$/.test(ic)) {
      alert('Malaysian IC must be exactly 12 digits');
      return;
    }

    const { error } = await supabase.from('clients').insert({
      full_name: formData.get('full_name'),
      date_of_birth: dob,
      gender: formData.get('gender'),
      citizenship,
      ic_passport: ic,
      contact: formData.get('contact'),
      email: formData.get('email'),
      address: formData.get('address'),
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Registration successful!');
      form.reset();
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h1 style={{ color: 'orange' }}>
        Register now to secure your slot
      </h1>

      <form onSubmit={handleSubmit}>
        <input name="full_name" placeholder="Full Name" required />
        <br /><br />

        <input
          type="date"
          required
          onChange={(e) => setDob(e.target.value)}
        />
        <p>Age: {age}</p>

        <select name="gender" required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <br /><br />

        <select onChange={(e) => setCitizenship(e.target.value)}>
          <option>Malaysian</option>
          <option>Foreigner</option>
        </select>
        <br /><br />

        <input
          name="ic_passport"
          placeholder="IC / Passport"
          required
        />
        <br /><br />

        <input name="contact" placeholder="Contact Number" />
        <br /><br />

        <input name="email" placeholder="Email" />
        <br /><br />

        <textarea name="address" placeholder="Address (Optional)" />
        <br /><br />

        <button style={{ background: 'orange', color: 'white' }}>
          Register
        </button>
      </form>
    </div>
  );
}
