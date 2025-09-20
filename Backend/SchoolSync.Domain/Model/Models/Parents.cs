namespace SchoolSync.Domain.Models
{
    public class Parents
    {
        public Guid Id { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public Guid StudentId { get; set; }
        public Student Student { get; set; }
    }
}
