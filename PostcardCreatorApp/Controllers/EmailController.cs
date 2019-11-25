using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PostcardCreatorApp.Models;
using PostcardCreatorApp.Models.EmailController;

namespace PostcardCreatorApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly SmtpClient smtpClient;
        private readonly string fromEmail;

        public EmailController(IOptions<SmtpSettingsModel> smtpSettings)
        {
            smtpClient = new SmtpClient
            {
                Host = smtpSettings.Value.Host,
                Port = int.Parse(smtpSettings.Value.Port),
                EnableSsl = bool.Parse(smtpSettings.Value.DefaultCredentials),
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential(smtpSettings.Value.UserName, smtpSettings.Value.Password)
            };

            fromEmail = smtpSettings.Value.UserName;
        }

        // POST: api/Email/MailPostcard
        [HttpPost("[action]")]
        public void MailPostcard([FromBody] MailPostcardModel body)
        {
            try
            {
                string base64str = "base64,";
                byte[] bytes = Convert.FromBase64String(body.image.Substring(body.image.IndexOf(base64str) + base64str.Length));
                MemoryStream ms = new MemoryStream(bytes);
                
                var imgAtt = new Attachment(ms, "postcard.png", "image/png");

                using (var message = new MailMessage(fromEmail, body.toEmail)
                {
                    Subject = $"DevTest {DateTime.Now}",
                    Body = "DevTestBody",
                })
                {
                    message.Attachments.Add(imgAtt);

                    smtpClient.Send(message);
                }
            }
            catch (Exception ex)
            {
            }
        }
    }
}
