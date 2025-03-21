import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react'; // Icônes pour email, mot de passe et nom d'utilisateur
import { useAuthStore } from '../store/authStore'; // Store pour l'authentification

export function LoginPage() {
  // États pour gérer les champs du formulaire
  const [username, setUsername] = useState(''); // Champ pour le nom d'utilisateur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Champ de confirmation du mot de passe
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle entre Connexion et Inscription
  const navigate = useNavigate();
  
  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup); 

// Gestion de la soumission du formulaire
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Bouton cliqué !");
  setError('');

  // Vérification des mots de passe et du nom d'utilisateur
  if (!isLogin && password !== confirmPassword) {
    setError('Les mots de passe ne correspondent pas');
    return;
  }

  if (!isLogin && username.trim() === '') {
    setError('Veuillez entrer un nom d\'utilisateur');
    return;
  }

  try {
    if (isLogin) {
      // Connexion normale
      await login(email, password);
    } else {
      // Inscription puis connexion automatique
      const newUser = await signup(username, email, password);
      console.log("Inscription réussie :", newUser);

      // Connexion automatique après inscription
      await login(email, password);
    }

    navigate('/'); // Redirection après connexion réussie
  } catch (err) {
    console.error("Erreur :", err);
    setError('Identifiants incorrects ou une erreur s\'est produite');
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md space-y-6">
        {/* Header avec Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <Mail className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h1>
          <p className="text-gray-500 text-sm">
            {isLogin ? 'Sign in to access your latest news feed' : 'Fill in the details to create a new account'}
          </p>
        </div>

        {/* Affichage du message d'erreur */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}

        {/* Formulaire de Connexion / Inscription */}
        <form onSubmit={handleSubmit} className="space-y-4">
   {/* Champ pour le nom d'utilisateur uniquement en mode inscription */}
   {!isLogin && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Choose a username"
                required
              />
            </div>
          )}

          {/* Champ email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Champ mot de passe */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-500" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Champ pour confirmer le mot de passe uniquement en mode inscription */}
          {!isLogin && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" />
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

       

          {/* Bouton de soumission du formulaire */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:bg-gradient-to-l transition duration-300"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Lien pour basculer entre Connexion et Inscription */}
        <div className="text-center mt-4 text-sm text-gray-500">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline ml-1"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
