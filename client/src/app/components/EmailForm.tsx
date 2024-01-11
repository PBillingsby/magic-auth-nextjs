import { useState } from 'react';

const EmailForm = ({ onEmailSubmit, disabled }: any) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
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
            // size='sm'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          // prefix={<Icon type={MonochromeIcons.Envelope} size={23} color={'#000'} />}
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
