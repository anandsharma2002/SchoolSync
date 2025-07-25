﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SMSDataModel.Model.Models;

namespace SMSDataModel.Model.RequestDtos
{
    public class CreateStudentRqstDto
    {
        [Required]
        public string SRNumber { get; set; }
        [Required]
        public int RollNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        public DateOnly DOB { get; set; }
        [Required]
        [MaxLength(10)]
        public string Gender { get; set; }
        [Required]
        public Guid ClassId { get; set; }

    }
}

