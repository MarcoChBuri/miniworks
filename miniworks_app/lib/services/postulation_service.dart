import 'api_service.dart';

class PostulationService {
  final ApiService _apiService = ApiService();
  
  Future<Map<String, dynamic>> applyToJob(String jobId) async {
    return await _apiService.post(
      '/postulations/jobs/$jobId/apply',
      {},
      requireAuth: true,
    );
  }
  
  Future<Map<String, dynamic>> acceptApplicant(String jobId, String applicationId) async {
    return await _apiService.put(
      '/postulations/jobs/$jobId/applications/$applicationId/accept',
      {},
      requireAuth: true,
    );
  }

  Future<List<dynamic>> getMyPostulations() async {
    final response = await _apiService.get('/students/applications', requireAuth: true);
    return response as List<dynamic>;
  }

  Future<List<dynamic>> getJobApplicants(String jobId) async {
    final response = await _apiService.get('/employers/jobs/$jobId/applications', requireAuth: true);
    return response as List<dynamic>;
  }
}
