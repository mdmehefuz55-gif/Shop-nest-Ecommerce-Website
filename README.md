# Shop-nest-Ecommerce-Website

ShopNest is a modern and responsive e-commerce web application designed for seamless online shopping, allowing users to explore and purchase a variety of products, including clothing, fashion accessories, gadgets, and everyday lifestyle items.

Built with clean **HTML5, CSS3, and Vanilla JavaScript**, it features a client-side shopping cart powered by `localStorage`, dynamic catalog rendering, responsive product cards, and multi-page routing. It is lightweight, self-contained, and ready for deployment on **GitHub Pages**, **Netlify**, or **AWS S3 / EC2**.

---
> This is a front-end only demo. There is **no real backend or payment system**. The cart uses `localStorage` in the browser.

## Project Structure

- `index.html` - Home page with hero section and featured products.
- `products.html` - Full list of products with **Add to Cart** buttons.
- `cart.html` - Shows items stored in the cart using **localStorage**, with total price and remove buttons.
- `login.html` - Simple demo login form (no backend).
- `contact.html` - Contact information and form (no real email sending).
- `style.css` - Global styles (navigation, product cards, layout, responsiveness).
- `script.js` - JavaScript for product data, cart logic, and basic form handling.

## Features

- Clean, responsive layout that works on desktop and mobile.
- Navigation bar with links: **Home | Products | Cart | Login | Contact**
- Product cards with images, names, prices, and Add to Cart buttons.
- Cart page:
 - Reads and writes cart data from `localStorage`.
 - Shows item quantity, per-item subtotal, and total price.
 - Allows removing items from the cart.
- Simple login and contact forms with basic front-end validation.

## How to Run Locally

1. Download or clone this project into a folder, for example:
 - `c:\Users\YOUR_NAME\Desktop\projects\shopnest\`
2. Open `index.html` in your web browser (you can double-click it).
3. Navigate using the top menu:
 - Go to **Products** to add items to the cart.
 - Go to **Cart** to see items and remove them.

> For some browser security settings, using the `file://` path is enough. For more advanced use, you can serve the folder using any simple static server (Python, Node, etc.), but this is not required.

---

## Deploying to GitHub Pages

GitHub Pages is a free static website hosting service from GitHub.

### Steps

1. **Create a GitHub repository**
 - Log in to GitHub.
 - Click **New** repository.
 - Give it a name, for example `shopnest`.
 - Leave it as **Public** and click **Create repository**.

2. **Add project files to the repository**
 - Copy all files from the `shopnest` folder (`index.html`, `products.html`, `cart.html`, `login.html`, `contact.html`, `style.css`, `script.js`, `README.md`) into your local repository folder.
 - Commit and push the changes to GitHub.

3. **Enable GitHub Pages**
 - Go to your repository on GitHub.
 - Open **Settings** -> **Pages** (or **Code and automation -> Pages**).
 - Under **Source**, select:
 - **Branch**: `main` (or `master`, depending on your repo).
 - **Folder**: `/ (root)`.
 - Click **Save**.

4. **Access your site**
 - After a short build time, GitHub will show the site URL (something like `https://your-username.github.io/shopnest/`).
 - Open the URL in your browser.

---

## Deploying to Netlify

Netlify is a popular hosting platform for static sites with a very easy workflow.

### Option 1 - Drag & Drop

1. Go to [https://app.netlify.com](https://app.netlify.com) and create a free account.
2. On the Netlify dashboard, choose **Add new site -> Deploy manually** (or **Drag & drop**).
3. Drag the entire contents of the `shopnest` folder into the upload area.
4. Netlify will upload the files and give you a **live URL** (you can also rename the site).

### Option 2 - From Git Repository

1. Push your `shopnest` project to a GitHub, GitLab, or Bitbucket repository.
2. In Netlify, click **Add new site -> Import an existing project**.
3. Connect your Git provider and select the repository.
4. Because this is a static site:
 - **Build command**: leave empty.
 - **Publish directory**: the repository root (where `index.html` lives).
5. Click **Deploy site** and, after the first build, Netlify will give you a URL.

---

## Deploying to AWS S3 Static Website Hosting

Amazon S3 can host static websites directly from an S3 bucket.

### Steps

1. **Create an S3 bucket**
 - Sign in to the AWS Management Console.
 - Go to **S3**.
 - Click **Create bucket**.
 - Choose a unique bucket name (for example, `shopnest-demo-yourname`) and region.
 - Create the bucket.

2. **Upload the website files**
 - Open the bucket.
 - Click **Upload** and add all files from the `shopnest` folder.
 - Make sure the files sit at the root of the bucket (not inside another subfolder).

3. **Enable static website hosting**
 - In the bucket, go to the **Properties** tab.
 - Scroll to **Static website hosting** (or **Static website hosting** section).
 - Click **Edit**, then:
 - Enable **Static website hosting**.
 - Set **Index document**: `index.html`.
 - Optionally set **Error document**: `index.html` or `404.html` (you can leave it blank).
 - Save changes. AWS will provide a **Website endpoint URL**.

4. **Allow public read access**
 - For a simple demo, you can allow public read access.
 - Go to the **Permissions** tab.
 - Add a **Bucket policy** that allows `s3:GetObject` for all objects in the bucket.
 - Example (replace `YOUR_BUCKET_NAME` with your bucket name):

 ```json
 {
 "Version": "2012-10-17",
 "Statement": [
 {
 "Sid": "PublicReadGetObject",
 "Effect": "Allow",
 "Principal": "*",
 "Action": "s3:GetObject",
 "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
 }
 ]
 }
 ```

5. **Open your site**
 - Use the **Website endpoint URL** from the Static website hosting settings.

---

## Deploying to AWS EC2 (Optional)

For a cloud computing course, you may also show deployment on an EC2 virtual machine using a simple web server.

### High-level steps

1. **Launch an EC2 instance**
 - Choose a small instance (for example, Amazon Linux or Ubuntu).
 - Allow HTTP (port 80) in the security group.

2. **Install a web server**
 - SSH into your instance.
 - Install Nginx or Apache. For example, on Ubuntu:

 ```bash
 sudo apt update
 sudo apt install nginx -y
 ```

3. **Copy project files to the web root**
 - On many systems, the web root is `/var/www/html`.
 - Copy all files from the `shopnest` folder into `/var/www/html` (for example using `scp` or an SFTP client).

4. **Access your site**
 - Open `http://YOUR_EC2_PUBLIC_IP/` in a browser.

This deployment uses exactly the same static files (HTML, CSS, JS) as the other hosting options.

---

## Summary

- **Technology stack:** HTML, CSS, Vanilla JavaScript.
- **Cart storage:** `localStorage` in the browser.
- **Hosting options:** GitHub Pages, Netlify, AWS S3 Static Website Hosting, AWS EC2.

You can now use **Shop Nest** as a simple and clear example in your **cloud computing project report or presentation**.

