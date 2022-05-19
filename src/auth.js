export function setSession(token = '') {
    localStorage.setItem('token', token);
  }
  
  export function getSession() {
    return {
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
    };
  }
  
  export function clearSession() {
    localStorage.removeItem('token');
    
  }

  export function isAuthenticated(){
      const user=JSON.parse(localStorage.getItem('user'));
      return Boolean (user?.email);
  }
  