package com.prolifics.DashboardMS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prolifics.DashboardMS.domain.PepPPlan369SubmitQuestionaire;

@Repository
public interface PepPPlan369SubmitQuestionaireRepository extends JpaRepository<PepPPlan369SubmitQuestionaire, Integer>{
	


	
	List<PepPPlan369SubmitQuestionaire> getPepPPlan369SubmitQuestionaireByEmployeeIdAndQuarterId(String employeeId, Integer quarterId);
	PepPPlan369SubmitQuestionaire getPepPPlan369SubmitQuestionaireByEmployeeIdAndQuarterIdAndReviewLevel ( String employeeId, Integer quarterId,Integer reviewLevel);
	PepPPlan369SubmitQuestionaire getByEmployeeIdAndQuarterId(String string, int parseInt);

	
}
