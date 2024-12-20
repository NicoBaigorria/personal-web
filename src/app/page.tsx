"use client";  
import "@/styles/globals.scss";
import { useRouter } from 'next/navigation'; 

export default function Page() {
  const router = useRouter();

  return (
    <div className="page-container">

      <nav className="navbar">
        <ul>
          <li><a onClick={() => router.push('/')}>Home</a></li>
          <li><a onClick={() => router.push('/about')}>About Me</a></li>
          <li><a onClick={() => router.push('/projects')}>Projects</a></li>
          <li><a onClick={() => router.push('/gallery')}>Gallery</a></li>
        </ul>

        <div className="social-links">
          <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:nicobaig@hotmail.com" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </nav>

      <main className="content">
        <h1>Welcome to My Portfolio</h1>
        <p>This is the base page with a navbar.</p>
      </main>
    </div>
  );
}
