import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import 'jobs_screen.dart';
import 'create_job_screen.dart';
import 'login_screen.dart';
import 'my_postulations_screen.dart';
import 'my_jobs_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    final userRole = authProvider.userRole;

    return Scaffold(
      appBar: AppBar(
        title: const Text('MiniWorks'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await authProvider.logout();
              if (context.mounted) {
                Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (_) => const LoginScreen()),
                );
              }
            },
          ),
        ],
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(24.0),
          children: [
            Text(
              'Bienvenido,',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[600],
              ),
            ),
            Text(
              authProvider.user?['name'] ?? 'Usuario',
              style: const TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.deepPurple,
              ),
            ),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: Colors.deepPurple.withOpacity(0.1),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    userRole == 'ESTUDIANTE' ? Icons.school : Icons.business,
                    size: 16,
                    color: Colors.deepPurple,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    userRole ?? 'N/A',
                    style: const TextStyle(
                      fontSize: 14,
                      color: Colors.deepPurple,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            if (userRole == 'ESTUDIANTE') ...[
              _buildMenuCard(
                context,
                title: 'Buscar Trabajos',
                subtitle: 'Explora oportunidades disponibles',
                icon: Icons.search,
                color: Colors.blue,
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const JobsScreen()),
                  );
                },
              ),
              const SizedBox(height: 16),
              _buildMenuCard(
                context,
                title: 'Mis Postulaciones',
                subtitle: 'Ver estado de mis aplicaciones',
                icon: Icons.assignment,
                color: Colors.orange,
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const MyPostulationsScreen()),
                  );
                },
              ),
            ],
            if (userRole == 'PUBLICADOR DE TRABAJO') ...[
              _buildMenuCard(
                context,
                title: 'Mis Publicaciones',
                subtitle: 'Administrar mis trabajos y aplicantes',
                icon: Icons.list_alt,
                color: Colors.blue,
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const MyJobsScreen()),
                  );
                },
              ),
              const SizedBox(height: 16),
              _buildMenuCard(
                context,
                title: 'Crear Nuevo Trabajo',
                subtitle: 'Publicar una nueva oferta',
                icon: Icons.add_circle,
                color: Colors.green,
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const CreateJobScreen()),
                  );
                },
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildMenuCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Card(
      elevation: 4,
      shadowColor: color.withOpacity(0.4),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, size: 32, color: color),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      subtitle,
                      style: TextStyle(
                        fontSize: 13,
                        color: Colors.grey[600],
                      ),
                    ),
                  ],
                ),
              ),
              Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey[400]),
            ],
          ),
        ),
      ),
    );
  }
}
