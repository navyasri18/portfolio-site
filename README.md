# 🌟 Navya Sri | Portfolio

Welcome to the personal portfolio website of **Navya Sri**, a passionate **Software Developer** focused on building engaging, full-stack web experiences.

## ✨ Features

* 🖥️ Responsive & modern layout
* 🎨 Clean, animated design using AOS & Typed.js
* 📄 Sections: Home, About, Resume, Projects, Contact
* 💼 Sidebar navigation
* 💌 Contact form powered by Formsubmit (no backend needed)
* 🌐 GitHub Pages deploy-ready

## 🚀 Setup & Usage

1. **Clone this repository:**

   ```bash
   git clone https://github.com/navyasri18/portfolio-site/
   cd portfolio-site
   ```

2. **Open in browser:**

   Open `index.html` directly in your browser
   *or* deploy to GitHub Pages (see below).

## 📬 Contact Form Setup (Using Formsubmit)

The contact form uses [Formsubmit](https://formsubmit.co/) for email submissions without server-side code.

### ✅ Setup Instructions:

1. Go to `contact.html`.

2. Update the form action:

   ```html
   <form action="https://formsubmit.co/YOUR_EMAIL_HERE" method="POST">
     <!-- Optional: Hidden fields -->
     <input type="hidden" name="_captcha" value="false">
     <input type="hidden" name="_template" value="box">
     <input type="hidden" name="_autoresponse" value="Thanks for contacting me! I’ll get back to you soon.">
   ```

3. Replace `YOUR_EMAIL_HERE` with your actual email (e.g., `navyasri.annapareddy@gmail.com`).

4. Done! Submissions will now go to your inbox.

## 🌍 Deployment

To deploy via **GitHub Pages**:

1. Push code to your GitHub repository.
2. Go to `Settings > Pages`.
3. Select the branch (e.g., `main`) and root directory.
4. Save and your site will be live at `https://yourusername.github.io/portfolio-name`.

## Technologies Used

* HTML5: For the structure of the website.
* CSS3: Styling, animations, and responsiveness.
* JavaScript: For interactive elements, such as the typing animation (Typed.js).
* AOS (Animate On Scroll): Adds animation effects when scrolling.
* FontAwesome: Icons for the sidebar menu and other sections.
