import 'package:flutter/material.dart';
import '../services/postulation_service.dart';

class MyPostulationsScreen extends StatefulWidget {
  const MyPostulationsScreen({super.key});

  @override
  State<MyPostulationsScreen> createState() => _MyPostulationsScreenState();
}

class _MyPostulationsScreenState extends State<MyPostulationsScreen> {
  final PostulationService _postulationService = PostulationService();
  List<dynamic> _postulations = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadPostulations();
  }

  Future<void> _loadPostulations() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final postulations = await _postulationService.getMyPostulations();
      setState(() {
        _postulations = postulations;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mis Postulaciones'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text('Error: $_error'),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: _loadPostulations,
                        child: const Text('Reintentar'),
                      ),
                    ],
                  ),
                )
              : _postulations.isEmpty
                  ? const Center(child: Text('No has realizado postulaciones aún'))
                  : RefreshIndicator(
                      onRefresh: _loadPostulations,
                      child: ListView.builder(
                        itemCount: _postulations.length,
                        padding: const EdgeInsets.all(16),
                        itemBuilder: (context, index) {
                          final postulation = _postulations[index];
                          final job = postulation['job']; // Assuming populated
                          
                          // Handle case where job might be just an ID or null if backend didn't populate
                          final jobTitle = job is Map ? job['title'] : 'Trabajo #${postulation['job'] ?? 'N/A'}';
                          final jobCompany = job is Map ? job['company'] : '';
                          
                          return Card(
                            elevation: 2,
                            margin: const EdgeInsets.only(bottom: 16),
                            child: Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    jobTitle,
                                    style: const TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  if (jobCompany.isNotEmpty) ...[
                                    const SizedBox(height: 4),
                                    Text(
                                      jobCompany,
                                      style: const TextStyle(color: Colors.grey),
                                    ),
                                  ],
                                  const SizedBox(height: 12),
                                  Row(
                                    children: [
                                      const Text('Estado: ', style: TextStyle(fontWeight: FontWeight.w500)),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                        decoration: BoxDecoration(
                                          color: _getStatusColor(postulation['status']),
                                          borderRadius: BorderRadius.circular(12),
                                        ),
                                        child: Text(
                                          postulation['status'] ?? 'Pendiente',
                                          style: const TextStyle(color: Colors.white, fontSize: 12),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    'Fecha: ${_formatDate(postulation['date'])}',
                                    style: const TextStyle(fontSize: 12, color: Colors.grey),
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ),
    );
  }

  Color _getStatusColor(String? status) {
    switch (status?.toLowerCase()) {
      case 'aceptado':
        return Colors.green;
      case 'rechazado':
        return Colors.red;
      default:
        return Colors.orange;
    }
  }

  String _formatDate(String? dateStr) {
    if (dateStr == null) return 'N/A';
    try {
      final date = DateTime.parse(dateStr);
      return '${date.day}/${date.month}/${date.year}';
    } catch (_) {
      return dateStr;
    }
  }
}
