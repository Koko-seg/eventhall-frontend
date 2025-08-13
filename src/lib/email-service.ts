export interface EmailNotification {
  id: string;
  to: string[];
  subject: string;
  content: string;
  type: "venue_registration" | "booking_confirmation" | "admin_approval";
  data: any;
  sentAt: string;
  status: "sent" | "pending" | "failed";
}

export interface VenueRegistrationEmailData {
  venueName: string;
  ownerName: string;
  ownerEmail: string;
  location: string;
  address: string;
  capacity: string;
  pricePerEvent: string;
  description: string;
  amenities: string[];
  eventTypes: string[];
  availableTimes: string[];
  contactPhone: string;
  businessLicense: string;
  specialFeatures: string;
  submittedAt: string;
}

class EmailService {
  private static instance: EmailService;
  private superAdminEmails = [
    "superadmin1@eventspace.com",
    "superadmin2@eventspace.com",
  ];

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendVenueRegistrationNotification(
    venueData: VenueRegistrationEmailData
  ): Promise<boolean> {
    try {
      const emailContent = this.generateVenueRegistrationEmail(venueData);

      const notification: EmailNotification = {
        id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        to: this.superAdminEmails,
        subject: `New Venue Registration: ${venueData.venueName}`,
        content: emailContent,
        type: "venue_registration",
        data: venueData,
        sentAt: new Date().toISOString(),
        status: "sent",
      };

      // In a real app, this would call an email API
      // For demo, we'll store in localStorage
      this.storeEmailNotification(notification);

      console.log("Email notification sent to Super Admin:", notification);
      return true;
    } catch (error) {
      console.error("Failed to send email notification:", error);
      return false;
    }
  }

  private generateVenueRegistrationEmail(
    data: VenueRegistrationEmailData
  ): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #F59E0B, #10B981); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .venue-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .info-row { display: flex; justify-content: space-between; margin: 8px 0; }
        .label { font-weight: bold; color: #555; }
        .value { color: #333; }
        .amenities, .event-types, .time-slots { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag { background: #e3f2fd; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        .actions { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .button { display: inline-block; padding: 10px 20px; margin: 5px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .approve { background: #28a745; color: white; }
        .review { background: #ffc107; color: black; }
        .reject { background: #dc3545; color: white; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏛️ New Venue Registration</h1>
        <p>A new venue owner has submitted their event hall for review</p>
    </div>
    
    <div class="content">
        <h2>Venue Details</h2>
        
        <div class="venue-info">
            <div class="info-row">
                <span class="label">Venue Name:</span>
                <span class="value">${data.venueName}</span>
            </div>
            <div class="info-row">
                <span class="label">Owner:</span>
                <span class="value">${data.ownerName}</span>
            </div>
            <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">${data.ownerEmail}</span>
            </div>
            <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value">${data.contactPhone}</span>
            </div>
            <div class="info-row">
                <span class="label">Location:</span>
                <span class="value">${data.location}</span>
            </div>
            <div class="info-row">
                <span class="label">Address:</span>
                <span class="value">${data.address}</span>
            </div>
            <div class="info-row">
                <span class="label">Capacity:</span>
                <span class="value">${data.capacity} guests</span>
            </div>
            <div class="info-row">
                <span class="label">Price per Event:</span>
                <span class="value">$${data.pricePerEvent}</span>
            </div>
            ${
              data.businessLicense
                ? `
            <div class="info-row">
                <span class="label">Business License:</span>
                <span class="value">${data.businessLicense}</span>
            </div>
            `
                : ""
            }
        </div>

        ${
          data.description
            ? `
        <h3>Description</h3>
        <p>${data.description}</p>
        `
            : ""
        }

        <h3>Amenities</h3>
        <div class="amenities">
            ${data.amenities
              .map((amenity) => `<span class="tag">${amenity}</span>`)
              .join("")}
        </div>

        <h3>Event Types</h3>
        <div class="event-types">
            ${data.eventTypes
              .map((type) => `<span class="tag">${type}</span>`)
              .join("")}
        </div>

        <h3>Available Time Slots</h3>
        <div class="time-slots">
            ${data.availableTimes
              .map((time) => `<span class="tag">${time}</span>`)
              .join("")}
        </div>

        ${
          data.specialFeatures
            ? `
        <h3>Special Features</h3>
        <p>${data.specialFeatures}</p>
        `
            : ""
        }

        <div class="actions">
            <h3>Action Required</h3>
            <p>Please review this venue registration and take appropriate action:</p>
            <a href="#" class="button approve">✅ Approve Venue</a>
            <a href="#" class="button review">📋 Request More Info</a>
            <a href="#" class="button reject">❌ Reject Application</a>
        </div>

        <p><small>Submitted on: ${new Date(
          data.submittedAt
        ).toLocaleString()}</small></p>
    </div>
</body>
</html>
    `.trim();
  }

  private storeEmailNotification(notification: EmailNotification): void {
    const existingNotifications = JSON.parse(
      localStorage.getItem("emailNotifications") || "[]"
    );
    existingNotifications.push(notification);
    localStorage.setItem(
      "emailNotifications",
      JSON.stringify(existingNotifications)
    );
  }

  getEmailNotifications(): EmailNotification[] {
    return JSON.parse(localStorage.getItem("emailNotifications") || "[]");
  }

  getVenueRegistrationEmails(): EmailNotification[] {
    return this.getEmailNotifications().filter(
      (email) => email.type === "venue_registration"
    );
  }

  markEmailAsRead(emailId: string): void {
    const notifications = this.getEmailNotifications();
    const updatedNotifications = notifications.map((notification) =>
      notification.id === emailId
        ? { ...notification, status: "read" as any }
        : notification
    );
    localStorage.setItem(
      "emailNotifications",
      JSON.stringify(updatedNotifications)
    );
  }
}

export const emailService = EmailService.getInstance();
