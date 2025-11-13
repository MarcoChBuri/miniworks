const Job = require('../models/job.model');

class JobRepository {

    async save(jobData) {
        const newJob = new Job(jobData);
        return newJob.save();
    }

    async findById(id) {
        return Job.findById(id)
            .populate('createdBy', 'name email')
            .populate('applications.applicant', 'name email cedula') // ✅ también populamos postulantes
            .lean();
    }

    async findAllOpen() {
        return Job.find({ status: 'abierto' })
            .sort({ createdAt: -1 })
            .lean();
    }

    async addApplicant(jobId, studentId, message = '') {
        const application = {
            applicant: studentId,
            message
        };

        return Job.findByIdAndUpdate(
            jobId,
            { $push: { applications: application } },
            { new: true }
        )
        .populate('applications.applicant', 'name email cedula')
        .lean();
    }

    async search(query) {
        const regex = new RegExp(query, 'i');
        return Job.find({
            status: 'abierto',
            $or: [
                { title: regex },
                { description: regex },
                { company: regex }
            ]
        }).lean();
    }

    async findByEmployer(employerId) {
        return Job.find({ createdBy: employerId })
            .sort({ createdAt: -1 })
            .lean();
    }

    async getApplicantsByJobId(jobId) {
        return Job.findById(jobId)
            .populate('applications.applicant', 'name email cedula')
            .select('title applications')
            .lean();
    }

    async acceptApplicant(jobId, applicantId) {
        const updatedJob = await Job.findOneAndUpdate(
            { _id: jobId, 'applications.applicant': applicantId },
            {
                $set: {
                    'applications.$.status': 'aceptado',
                    acceptedCandidate: applicantId,
                    status: 'en proceso'
                }
            },
            { new: true }
        )
        .populate('acceptedCandidate', 'name email cedula')
        .lean();

        return updatedJob;
    }

    async findJobsByApplicant(studentId) {
        return Job.find({ 'applications.applicant': studentId })
            .populate('createdBy', 'name email company')
            .select('title description company status createdAt')
            .lean();
    }
}

module.exports = new JobRepository();
