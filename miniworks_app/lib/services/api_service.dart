import 'package:flutter/foundation.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  // Configurable base URL
  static String get baseUrl {
    if (kIsWeb) {
      return 'http://localhost:3000/api';
    } else if (defaultTargetPlatform == TargetPlatform.android) {
      // 10.0.2.2 is the special alias to your host loopback interface (i.e., 127.0.0.1 on your development machine)
      return 'http://10.0.2.2:3000/api'; 
    } else {
      return 'http://localhost:3000/api';
    }
  }
  
  String? _token;
  
  Future<void> loadToken() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('auth_token');
  }
  
  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
    _token = token;
  }
  
  Future<void> clearToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
    _token = null;
  }
  
  Map<String, String> _getHeaders({bool includeAuth = true}) {
    final headers = {
      'Content-Type': 'application/json',
    };
    
    if (includeAuth && _token != null) {
      headers['Authorization'] = 'Bearer $_token';
    }
    
    return headers;
  }
  
  Future<Map<String, dynamic>> get(String endpoint, {bool requireAuth = false}) async {
    if (requireAuth) await loadToken();
    
    final response = await http.get(
      Uri.parse('$baseUrl$endpoint'),
      headers: _getHeaders(includeAuth: requireAuth),
    );
    
    return _handleResponse(response);
  }
  
  Future<Map<String, dynamic>> post(String endpoint, Map<String, dynamic> body, {bool requireAuth = false}) async {
    if (requireAuth) await loadToken();
    
    final response = await http.post(
      Uri.parse('$baseUrl$endpoint'),
      headers: _getHeaders(includeAuth: requireAuth),
      body: jsonEncode(body),
    );
    
    return _handleResponse(response);
  }
  
  Future<Map<String, dynamic>> put(String endpoint, Map<String, dynamic> body, {bool requireAuth = true}) async {
    if (requireAuth) await loadToken();
    
    final response = await http.put(
      Uri.parse('$baseUrl$endpoint'),
      headers: _getHeaders(includeAuth: requireAuth),
      body: jsonEncode(body),
    );
    
    return _handleResponse(response);
  }
  
  Map<String, dynamic> _handleResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return jsonDecode(response.body);
    } else {
      final error = jsonDecode(response.body);
      throw Exception(error['message'] ?? 'Error desconocido');
    }
  }
}
