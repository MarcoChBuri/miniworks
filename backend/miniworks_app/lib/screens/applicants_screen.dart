import 'package:flutter/material.dart';
import '../services/postulation_service.dart';

class ApplicantsScreen extends StatefulWidget {
  final String jobId;
  final String jobTitle;

  const ApplicantsScreen({
    super.key,
    required this.jobId,
    required this.jobTitle,
  });

  @override
  State<ApplicantsScreen> createState() => _ApplicantsScreenState();
}

class _ApplicantsScreenState extends State<ApplicantsScreen> {
  final PostulationService _postulationService = PostulationService();
  List<dynamic> _applicants = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadApplicants();
  }

  Future<void> _loadApplicants() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final applicants = await _postulationService.getJobApplicants(widget.jobId);
      setState(() {
        _applicants = applicants;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Future<void> _acceptApplicant(String applicationId) async {
    try {
      await _postulationService.acceptApplicant(widget.jobId, applicationId);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Postulante aceptado exitosamente')),
        );
        _loadApplicants(); // Refresh list
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Postulantes: ${widget.jobTitle}'),
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
                        onPressed: _loadApplicants,
                        child: const Text('Reintentar'),
                      ),
                    ],
                  ),
                )
              : _applicants.isEmpty
                  ? const Center(child: Text('No hay postulantes aún'))
                  : RefreshIndicator(
                      onRefresh: _loadApplicants,
                      child: ListView.builder(
                        itemCount: _applicants.length,
                        padding: const EdgeInsets.all(16),
                        itemBuilder: (context, index) {
                          final application = _applicants[index];
                          // Depending on backend, 'applicant' might be ID or object. 
                          // Assuming simplified view for now as we might not have full user details expanded in all endpoints
                          final applicantId = application['applicant'] is Map 
                              ? application['applicant']['name'] ?? 'Usuario' 
                              : 'Usuario #${application['applicant']}';
                          
                          final status = application['status'] ?? 'pendiente';
                          final isPending = status == 'pendiente';

                          return Card(
                            margin: const EdgeInsets.only(bottom: 16),
                            child: Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Row(
                                children: [
                                  CircleAvatar(
                                    child: Text(applicantId.toString().substring(0, 1).toUpperCase()),
                                  ),
                                  const SizedBox(width: 16),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          applicantId.toString(),
                                          style: const TextStyle(fontWeight: FontWeight.bold),
                                        ),
                                        Text(
                                          'Estado: $status',
                                          style: TextStyle(
                                            color: status == 'aceptado' ? Colors.green : Colors.grey,
                                            fontSize: 12,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  if (isPending)
                                    ElevatedButton(
                                      onPressed: () => _acceptApplicant(application['_id']),
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.green,
                                        foregroundColor: Colors.white,
                                        padding: const EdgeInsets.symmetric(horizontal: 12),
                                      ),
                                      child: const Text('Aceptar'),
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
