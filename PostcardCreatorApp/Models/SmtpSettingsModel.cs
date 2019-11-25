namespace PostcardCreatorApp.Models
{
    public class SmtpSettingsModel
    {
        public string DeliveryMethod { get; set; }
        public string Host { get; set; }
        public string Port { get; set; }
        public string DefaultCredentials { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
