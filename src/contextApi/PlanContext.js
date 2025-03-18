import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

axios.defaults.baseURL = "http://localhost:5000/api/admin/plans"; // Set base URL

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch plans from API
    const fetchPlans = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/");
            if (response.data.success) {
                setPlans(response.data.plans);
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add a new plan
    const addPlan = async (planData) => {
        try {
            const response = await axios.post("/add-plan", planData, {
                headers: { "Content-Type": "application/json" }
            });
            if (response.data.success) {
                setPlans((prev) => [...prev, response.data.plan]);
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    return (
        <PlanContext.Provider value={{ plans, loading, error, fetchPlans, addPlan }}>
            {children}
        </PlanContext.Provider>
    );
};

export const usePlans = () => {
    return useContext(PlanContext);
};
