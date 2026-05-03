<h1 align="center"> URLify — Link Management SaaS</h1>

<p align="center">
  <a href="https://ur-lify.vercel.app/" target="_blank" style="font-size:20px; font-weight:bold;">
    🔗 Live Demo — URLify
  </a>
</p>

<p align="center">
  URLify is a modern web application that allows users to save, organize, and manage links using a clean dashboard interface.
  <br>
  <strong>Built to explore real-world authentication, protected routing, and scalable frontend architecture using Next.js.</strong>
</p>

<hr>

<h2>🚀 Features</h2>

<h3>🔐 Authentication System (OAuth)</h3>
<ul>
  <li>Secure Google Login using <strong>Auth.js (NextAuth v5)</strong></li>
  <li>JWT-based session handling</li>
  <li>Persistent login state across refresh</li>
</ul>

<h3>🗂️ Folder-Based Organization</h3>
<ul>
  <li>Create and manage folders</li>
  <li>Organize links by categories</li>
  <li>User-specific data separation</li>
</ul>

<h3>🔗 Link Management</h3>
<ul>
  <li>Save important URLs</li>
  <li>Manage links inside folders</li>
  <li>Clean dashboard interface</li>
</ul>

<h3>🛡️ Protected Routes</h3>
<ul>
  <li>Unauthorized users cannot access:</li>
  <ul>
    <li>/home</li>
    <li>/folders</li>
  </ul>
  <li>Implemented using <strong>Next.js Proxy (server-side protection)</strong></li>
</ul>

<h3>⚡ Smart Redirect Logic</h3>
<ul>
  <li>Logged-in users cannot access login/signup pages</li>
  <li>Automatic redirect to dashboard</li>
  <li>No flicker, fully server-controlled navigation</li>
</ul>

<h3>📱 Modern UI</h3>
<ul>
  <li>Clean, minimal design</li>
  <li>Fully responsive layout</li>
  <li>Built with Tailwind + reusable components</li>
</ul>

<hr>

<h2>🔧 Engineering Decisions & Learnings</h2>

<ul>
  <li>
    Implemented <strong>server-side route protection</strong> using Next.js Proxy instead of relying only on client-side checks.
  </li>

  <li>
    Used <strong>Auth.js (NextAuth v5)</strong> with JWT strategy to handle authentication in a scalable way.
  </li>

  <li>
    Solved real-world production issues like:
    <ul>
      <li>OAuth redirect mismatches</li>
      <li>Infinite redirect loops</li>
      <li>Session mismatch between client and server</li>
    </ul>
  </li>

  <li>
    Designed authentication flow to work across both <strong>localhost and production (Vercel)</strong>.
  </li>

  <li>
    Learned handling of:
    <ul>
      <li>Secure cookies</li>
      <li>Environment variables</li>
      <li>Google OAuth configuration</li>
    </ul>
  </li>
</ul>

<hr>

<h2>🧩 Tech Stack Used</h2>

<table>
  <tr>
    <td><strong>Framework</strong></td>
    <td>Next.js 16 (App Router)</td>
  </tr>
  <tr>
    <td><strong>Authentication</strong></td>
    <td>Auth.js (NextAuth v5)</td>
  </tr>
  <tr>
    <td><strong>Database</strong></td>
    <td>MongoDB + Mongoose</td>
  </tr>
  <tr>
    <td><strong>Styling</strong></td>
    <td>Tailwind CSS</td>
  </tr>
  <tr>
    <td><strong>UI Components</strong></td>
    <td>shadcn/ui</td>
  </tr>
  <tr>
    <td><strong>Forms</strong></td>
    <td>React Hook Form</td>
  </tr>
  <tr>
    <td><strong>Validation</strong></td>
    <td>Zod</td>
  </tr>
  <tr>
    <td><strong>Deployment</strong></td>
    <td>Vercel</td>
  </tr>
</table>

<hr>

<h2>📸 Screenshots</h2>

<p>
  <img src="./screenshots/first.png" width="600" alt="Dashboard">
</p>

<p>
  <img src="./screenshots/second.png" width="600" alt="Folders">
</p>

<p>
  <img src="./screenshots/third.png" width="600" alt="Login">
</p>

<hr>

<h2>⚙️ Setup Instructions</h2>

<h3>1️⃣ Clone the repository</h3>
<pre>
git clone https://github.com/DeepAshishThapa/URLify-url-manager.git
</pre>
<pre>
cd URLify-url-manager
cd my-app
</pre>

<h3>2️⃣ Install dependencies</h3>
<pre>
npm install
</pre>

<h3>3️⃣ Set up environment variables</h3>
<p>Create a <code>.env.local</code> file in the root:</p>

<pre>
MONGODB_URI=your_mongodb_connection

AUTH_SECRET=your_secret
NEXTAUTH_SECRET=your_secret

AUTH_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
</pre>

<h3>4️⃣ Run development server</h3>
<pre>
npm run dev
</pre>

<hr>

<h2>🚀 Production Setup</h2>

<h3>Google OAuth Configuration</h3>
<pre>
Authorized Redirect URI:
https://your-domain.vercel.app/api/auth/callback/google

Authorized Origin:
https://your-domain.vercel.app
</pre>

<h3>Vercel Environment Variables</h3>
<pre>
AUTH_URL=https://your-domain.vercel.app
NEXTAUTH_URL=https://your-domain.vercel.app
</pre>

<hr>

<h2>📜 License</h2>
<p>This project is open source and available under the MIT License.</p>

<hr>

<h2>✨ Author</h2>
<p><strong>Deep Ashish</strong> — Developer & Creator of URLify</p>
<p>GitHub: <a href="https://github.com/DeepAshishThapa">DeepAshishThapa</a></p>