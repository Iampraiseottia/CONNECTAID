import nodemailer from 'nodemailer';

const createTransporter = () => {
  // First try Gmail with OAuth2 (recommended for production) 
  if (process.env.EMAIL_CLIENT_ID && process.env.EMAIL_CLIENT_SECRET && process.env.EMAIL_REFRESH_TOKEN) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      },
    });
  }
  
  // Fallback to App Password method
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  
  throw new Error('Email configuration not found');
};

// Email template for 6-digit verification code
function createEmailTemplate(code, fullName = 'User') {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ConnectAID - Verification Code</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #14b8a6 0%, #0891b2 100%); padding: 30px 20px; text-align: center;">
          <div style="display: inline-flex; align-items: center; gap: 15px;">
            <div style="width: 60px; height: 60px; background-color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative;">
              <span style="font-size: 24px; font-weight: bold; color: #14b8a6; padding-top: 15px; padding-left: 15px;">CA</span>
            </div>
            <h1 style="color: white; margin: 0; padding-top: 7px; font-size: 32px; font-weight: bold; letter-spacing: 1px;">ConnectAID</h1>
          </div> 
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; text-align: center;">Email Verification</h2>
          
          <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
            Hi ${fullName}, thank you for joining ConnectAID! Please use the verification code below to complete your account setup.
          </p>

          <!-- Verification Code -->
          <div style="background-color: #f3f4f6; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
            <div style="font-size: 36px; font-weight: bold; color: #14b8a6; letter-spacing: 8px; font-family: 'Courier New', monospace;">${code}</div>
          </div>

          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
            This code will expire in 15 minutes. If you didn't request this code, please ignore this email.
          </p>

          <!-- Call to Action -->
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #14b8a6; font-size: 16px; font-weight: 600; margin: 0;">
              Welcome to ConnectAID - Connecting Hearts, Changing Lives
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0; text-align: center;">
            This is an automated message from ConnectAID. Please do not reply to this email.
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0; text-align: center;">
            © 2025 ConnectAID. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Main function to send verification email
export async function sendVerificationEmail(email, code, fullName = 'User') {
  try {
    console.log(`📧 Attempting to send verification email to: ${email}`);
    
    const transporter = createTransporter();
    
    // Verify transporter configuration
    await transporter.verify();
    console.log('📧 Email transporter verified successfully');

    const mailOptions = {
      from: `"ConnectAID" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'ConnectAID - Email Verification Code',
      html: createEmailTemplate(code, fullName),
      text: `Hi ${fullName}, your ConnectAID verification code is: ${code}. This code will expire in 15 minutes.`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${email}:`, info.messageId);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('💥 Error sending verification email:', error);
    throw error;
  }
}