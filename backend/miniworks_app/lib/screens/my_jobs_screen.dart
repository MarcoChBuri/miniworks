import 'package:flutter/material.dart';
import '../services/job_service.dart';
import 'applicants_screen.dart';

class MyJobsScreen extends StatefulWidget {
  const MyJobsScreen({super.key});

  @override
  State<MyJobsScreen> createState() => _MyJobsScreenState();
}

class _MyJobsScreenState extends State<MyJobsScreen> {
  final JobService _jobService = JobService();
  List<dynamic> _jobs = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadMyJobs();
  }

  Future<void> _loadMyJobs() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final jobs = await _jobService.getMyJobs();
      setState(() {
        _jobs = jobs;
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
        title: const Text('Mis Publicaciones'),
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
                        onPressed: _loadMyJobs,
                        child: const Text('Reintentar'),
                      ),
                    ],
                  ),
                )
              : _jobs.isEmpty
                  ? const Center(child: Text('No has publicado trabajos aún'))
                  : RefreshIndicator(
                      onRefresh: _loadMyJobs,
                      child: ListView.builder(
                        itemCount: _jobs.length,
                        padding: const EdgeInsets.all(16),
                        itemBuilder: (context, index) {
                          final job = _jobs[index];
                          return Card(
                            elevation: 2,
                            margin: const EdgeInsets.only(bottom: 16),
                            child: Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    job['title'] ?? 'Sin título',
                                    style: const TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  Text(job['description'] ?? 'Sin descripción'),
                                  const SizedBox(height: 16),
                                  SizedBox(
                                    width: double.infinity,
                                    child: OutlinedButton.icon(
                                      onPressed: () {
                                        Navigator.of(context).push(
                                          MaterialPageRoute(
                                            builder: (_) => ApplicantsScreen(
                                              jobId: job['_id'],
                                              jobTitle: job['title'] ?? '',
                                            ),
                                          ),
                                        );
                                      },
                                      icon: const Icon(Icons.people),
                                      label: const Text('Ver Postulantes'),
                                    ),
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
}
