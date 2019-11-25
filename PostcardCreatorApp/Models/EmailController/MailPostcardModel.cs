using Newtonsoft.Json;
using System;

namespace PostcardCreatorApp.Models.EmailController
{
    [JsonObject]
    [Serializable]
    public class MailPostcardModel
    {
        public string toEmail { get; set; }
        public string image { get; set; }
    }
}
