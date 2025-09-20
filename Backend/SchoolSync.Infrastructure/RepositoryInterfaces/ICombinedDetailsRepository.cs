using SchoolSync.Domain.CombineModel;

namespace SchoolSync.InfrastructureInterfaces
{
    public interface ICombinedDetailsRepository
    {
        Task<HomeCombinedDetails> HomeCombinedDetail();
        Task<HomeCombinedDetails> DashboardCombinedDetail(Guid schoolId);
    }
}
