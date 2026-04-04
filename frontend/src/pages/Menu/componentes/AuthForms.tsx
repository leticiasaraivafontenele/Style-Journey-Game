import { useState } from 'react';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';

export default function AuthForms() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  return isRegisterMode ? (
    <FormRegister onSwitchToLogin={() => setIsRegisterMode(false)} />
  ) : (
    <FormLogin onSwitchToRegister={() => setIsRegisterMode(true)} />
  );
}
