using System.ComponentModel.DataAnnotations;

namespace SchoolSync.Domain.Models
{
    public class SchoolClass
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Section { get; set; }
        public Guid? ClassTeacherId { get; set; }
        public Teacher ClassTeacher { get; set; }
        public Guid SchoolId { get; set; }
        public School School { get; set; }
    }
}


