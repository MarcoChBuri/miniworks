import 'api_service.dart';

class JobService {
  final ApiService _apiService = ApiService();
  
  Future<List<dynamic>> getAllJobs() async {
    final response = await _apiService.get('/jobs/all');
    return response as List<dynamic>;
  }
  
  Future<List<dynamic>> searchJobs(String query) async {
    final response = await _apiService.get('/jobs/search?query=$query');
    return response as List<dynamic>;
  }
  
  Future<Map<String, dynamic>> getJobById(String id) async {
    return await _apiService.get('/jobs/$id');
  }
  
  Future<Map<String, dynamic>> createJob({
    required String title,
    required String description,
    required String company,
  }) async {
    return await _apiService.post(
      '/jobs/create',
      {
        'title': title,
        'description': description,
        'company': company,
      },
      requireAuth: true,
    );
  }
  
  Future<List<dynamic>> getAvailableJobs() async {
    final response = await _apiService.get('/students/jobs/available', requireAuth: true);
    return response as List<dynamic>;
  }
  
  Future<List<dynamic>> getMyJobs() async {
    final response = await _apiService.get('/employers/jobs/created', requireAuth: true);
    return response as List<dynamic>;
  }
}
