import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "tvoj@email.com",
        pass: "tvoja_lozinka",
      },
    });

    const mailOptions = {
      from: `"Website Contact" <${data.email}>`,
      to: "zdravapricastudio@gmail.com",
      subject: `New Contact Form Submission: ${data.services}`,
      text: `
        Name: ${data.first_name} ${data.last_name}
        Company: ${data.company || "-"}
        Email: ${data.email}
        Phone: ${data.phone || "-"}
        Services: ${data.services}
        Deadline: ${data.deadline || "-"}
        Budget: ${data.budget || "-"}
        Source: ${data.source || "-"}
        Description: ${data.description || "-"}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(JSON.stringify({ message: "Failed to send email." }), { status: 500 });
  }
}
