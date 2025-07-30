
# Majulock Mailer

Majulock Mailer is a lightweight desktop app built with Electron that lets you send emails quickly and securely. Designed with simplicity and style in mind, it supports real-time email sending with a clean UI, loading indicators, and recipient previews.



## Installation

### Option 1 : Use Pre-built Releases
Head to the Releases page and download the version for your system :

#### Linux :
- .AppImage
```bash
chmod +x majulockmailer-x.x.x.AppImage
./majulockmailer-x.x.x.AppImage
```
- .snap

```bash
sudo snap install --dangerous majulockmailer_x.x.x_amd64.snap
```
#### Windows :

Download the .exe installer and run it like any Windows application.
### Option 2 : Build From Source
#### 1 - Clone the Repository :
```bash
git clone https://github.com/ayoubchwt/Majulock-mailer
cd Majulock-mailer
```
#### 2 - Install Dependencies : 

```bash
npm install
```
#### 3 - Run in Development Mode : 
```bash
npm start
```
#### 3 - Build for Your OS : 
- Linux :
```bash
npm run build:linux
```
- Windows :
```bash
npm run build:win
```
The final builds will appear in the dist/ folder.





    
## Usage Guide 

#### 1 - Launch the app
#### 2 - Fill in :
- Your Gmail address and app password
- Recipient email
- Subject and Body
- Any attachments you'd like to add
#### 2 - Click Send
#### 3 - A loading screen will show the sending progress and the recipient's address.

### Important : make sure 2FA is enabled and use an App Password 




