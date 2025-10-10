// Supabase configuration and client setup
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Lead submission function
export async function submitLead(leadData) {
    try {
        const { data, error } = await supabase
            .from('leads')
            .insert([{
                name: leadData.name,
                email: leadData.email,
                phone: leadData.phone,
                company: leadData.company || null,
                service: leadData.service,
                message: leadData.message,
                source: leadData.source || 'website',
                budget: leadData.budget || null,
                newsletter_opt_in: leadData.newsletter || false
            }]);

        if (error) {
            console.error('Error submitting lead:', error);
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error in submitLead:', error);
        return { success: false, error: error.message };
    }
}

// Newsletter subscription function
export async function subscribeToNewsletter(email) {
    try {
        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .insert([{ email }]);

        if (error) {
            // Handle duplicate email error gracefully
            if (error.code === '23505') {
                return { success: true, message: 'Email already subscribed' };
            }
            console.error('Error subscribing to newsletter:', error);
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error in subscribeToNewsletter:', error);
        return { success: false, error: error.message };
    }
}

// Get all leads (for admin use)
export async function getLeads() {
    try {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching leads:', error);
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error in getLeads:', error);
        return { success: false, error: error.message };
    }
}

// Update lead status
export async function updateLeadStatus(leadId, status) {
    try {
        const { data, error } = await supabase
            .from('leads')
            .update({ status })
            .eq('id', leadId);

        if (error) {
            console.error('Error updating lead status:', error);
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error in updateLeadStatus:', error);
        return { success: false, error: error.message };
    }
}