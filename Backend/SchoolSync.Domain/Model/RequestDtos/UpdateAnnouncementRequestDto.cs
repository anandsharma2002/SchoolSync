namespace SchoolSync.Domain.RequestDtos
{
    public class UpdateAnnouncementRequestDto
    {
        public string Title { get; set; }
        public string Detail { get; set; }
        public DateOnly Date { get; set; }
        public string AnnouncedBy { get; set; }
    }
}
