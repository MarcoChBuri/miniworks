import 'api_service.dart';

class AuthService {
  final ApiService _apiService = ApiService();
  
  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await _apiService.post(
      '/admin/auth/login',
      {'email': email, 'password': password},
    );
    
    // Save token
    final token = response['user']['token'];
    await _apiService.saveToken(token);
    
    return response['user'];
  }
  
  Future<Map<String, dynamic>> register({
    required String email,
    required String name,
    required String password,
    required String cedula,
    String? role,
  }) async {
    final response = await _apiService.post(
      '/admin/auth/register',
      {
        'email': email,
        'name': name,
        'password': password,
        'cedula': cedula,
        if (role != null) 'role': role,
      },
    );
    
    return response;
  }
  
  Future<void> logout() async {
    await _apiService.clearToken();
  }
  
  Future<Map<String, dynamic>> getProfile(String userId) async {
    return await _apiService.get('/admin/auth/users/$userId', requireAuth: true);
  }
}
