import React, { useState } from 'react';

const EmailForm = ({ onEmailSubmit, disabled }: any) => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onEmailSubmit(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className='form-header'>Login</h3>
        <div className='input-wrapper'>
          <input
            className="rounded-md p-2"
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-[#6851ff] rounded-full p-2 text-white"
            disabled={disabled}
            onClick={handleSubmit}
          >
            Send Magic Link
          </button>
        </div>
      </form>
      <style>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        .form-header {
          font-size: 22px;
          margin: 25px 0;
        }
        .input-wrapper {
          width: 80%;
          margin: 0 auto 20px;
        }
      `}</style>
    </>
  );
};

export default EmailForm;
