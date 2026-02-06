import 'package:flutter/foundation.dart';
import '../services/auth_service.dart';

class AuthProvider with ChangeNotifier {
  final AuthService _authService = AuthService();
  
  Map<String, dynamic>? _user;
  bool _isLoading = false;
  String? _error;
  
  Map<String, dynamic>? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _user != null;
  
  String? get userRole => _user?['role'];
  String? get userId => _user?['id'];
  
  Future<void> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    
    try {
      _user = await _authService.login(email, password);
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      rethrow;
    }
  }
  
  Future<void> register({
    required String email,
    required String name,
    required String password,
    required String cedula,
    String? role,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    
    try {
      await _authService.register(
        email: email,
        name: name,
        password: password,
        cedula: cedula,
        role: role,
      );
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      rethrow;
    }
  }
  
  Future<void> logout() async {
    await _authService.logout();
    _user = null;
    notifyListeners();
  }
}
