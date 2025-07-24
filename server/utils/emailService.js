const nodemailer = require('nodemailer');

// Create transporter
const createTransport = () => {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email configuration is missing. Please set EMAIL_HOST, EMAIL_USER, and EMAIL_PASS environment variables.');
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send OTP email
exports.sendOTPEmail = async (email, otp, firstName) => {
  try {
    const transporter = createTransport();

    const mailOptions = {
      from: `"KalaaSetu" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your KalaaSetu Account - OTP Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Account</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d97706, #b45309); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px solid #d97706; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
            .otp-code { font-size: 32px; font-weight: bold; color: #d97706; letter-spacing: 5px; font-family: monospace; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: #d97706; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎭 KalaaSetu</h1>
              <p>Verify Your Account</p>
            </div>
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p>Thank you for joining KalaaSetu, India's premier platform for classical arts. To complete your registration, please verify your email address using the OTP code below:</p>
              
              <div class="otp-box">
                <p style="margin: 0; font-size: 16px; color: #666;">Your verification code is:</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">This code will expire in 10 minutes</p>
              </div>
              
              <p>If you didn't create an account with KalaaSetu, please ignore this email.</p>
              
              <div class="footer">
                <p>Best regards,<br>The KalaaSetu Team</p>
                <p style="font-size: 12px; color: #999;">This is an automated email. Please do not reply to this message.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Hello ${firstName}!
        
        Thank you for joining KalaaSetu. To complete your registration, please verify your email address using this OTP code:
        
        ${otp}
        
        This code will expire in 10 minutes.
        
        If you didn't create an account with KalaaSetu, please ignore this email.
        
        Best regards,
        The KalaaSetu Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

// Send application status email
exports.sendApplicationStatusEmail = async (email, firstName, status, rejectionReason = null) => {
  try {
    const transporter = createTransport();

    let subject, content;
    
    if (status === 'approved') {
      subject = 'Congratulations! Your Artist Application has been Approved';
      content = `
        <div class="content">
          <h2>🎉 Congratulations ${firstName}!</h2>
          <p>We're excited to inform you that your artist application has been <strong style="color: #10b981;">approved</strong>!</p>
          <p>You can now:</p>
          <ul>
            <li>Browse and apply for opportunities posted by clients</li>
            <li>Create your artist profile</li>
            <li>Connect with potential clients</li>
            <li>Showcase your talents to a wider audience</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/find-work" class="button">Start Finding Work</a>
          </div>
          <p>Welcome to the KalaaSetu community of talented artists!</p>
        </div>
      `;
    } else if (status === 'rejected') {
      subject = 'Update on Your Artist Application';
      content = `
        <div class="content">
          <h2>Hello ${firstName},</h2>
          <p>Thank you for your interest in joining KalaaSetu as an artist. After careful review, we regret to inform you that your application was not approved at this time.</p>
          ${rejectionReason ? `
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <h3 style="color: #dc2626; margin: 0 0 10px 0;">Reason for rejection:</h3>
              <p style="margin: 0; color: #7f1d1d;">${rejectionReason}</p>
            </div>
          ` : ''}
          <p>Don't be discouraged! You're welcome to reapply once you've addressed any concerns mentioned above. We encourage you to:</p>
          <ul>
            <li>Review and improve your application materials</li>
            <li>Gain additional experience or certifications</li>
            <li>Reapply when you feel ready</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/artist-apply" class="button">Reapply Now</a>
          </div>
          <p>Thank you for your understanding, and we hope to see you apply again soon.</p>
        </div>
      `;
    }

    const mailOptions = {
      from: `"KalaaSetu" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d97706, #b45309); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: #d97706; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
            ul { padding-left: 20px; }
            li { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎭 KalaaSetu</h1>
              <p>Artist Application Update</p>
            </div>
            ${content}
            <div class="footer">
              <p>Best regards,<br>The KalaaSetu Team</p>
              <p style="font-size: 12px; color: #999;">This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Application status email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending application status email:', error);
    throw error;
  }
};