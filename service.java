package com.prolifics.DashboardMS.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prolifics.DashboardMS.domain.PepPPlan369ProjectManagerFeedback;
import com.prolifics.DashboardMS.domain.PepPPlan369SubmitQuestionaire;
import com.prolifics.DashboardMS.repository.PepPPlan369SubmitQuestionaireRepository;

@Service
public class PepPPlan369SubmitQuestionaireService {
	
	@Autowired
	private PepPPlan369SubmitQuestionaireRepository pepPPlan369SubmitQuestionaireRepository;
	
	private static final Logger logger = LoggerFactory.getLogger(PepPPlan369SubmitQuestionaireService.class);

	
	public PepPPlan369SubmitQuestionaire savePepPPlan369SubmitQuestionaire(PepPPlan369SubmitQuestionaire pepPPlan369SubmitQuestionaire)
	{
		logger.info("In PepPPlan369SubmitQuestionaireService :: savePepPPlan369SubmitQuestionaire {}", pepPPlan369SubmitQuestionaire);
//		 PepPPlan369SubmitQuestionaire  pepPPlan369Submit=null;
		 if(pepPPlan369SubmitQuestionaire.getId() == null) {
			  return pepPPlan369SubmitQuestionaireRepository.saveAndFlush(pepPPlan369SubmitQuestionaire);
			 }else {
				 PepPPlan369SubmitQuestionaire submitQuestionaireDtls = pepPPlan369SubmitQuestionaireRepository.getById(pepPPlan369SubmitQuestionaire.getId());
				 submitQuestionaireDtls.setEmployee_id(pepPPlan369SubmitQuestionaire.getEmployeeId());
				 submitQuestionaireDtls.setQuarter_id(pepPPlan369SubmitQuestionaire.getQuarterId());
				 submitQuestionaireDtls.setNotifiedToHr(pepPPlan369SubmitQuestionaire.getNotifiedToHr());
				 submitQuestionaireDtls.setRating(pepPPlan369SubmitQuestionaire.getRating());
				 submitQuestionaireDtls.setIsPerformer(pepPPlan369SubmitQuestionaire.getIsPerformer());
				 submitQuestionaireDtls.setPromotion(pepPPlan369SubmitQuestionaire.getPromotion());
				 submitQuestionaireDtls.setPromotionComments(pepPPlan369SubmitQuestionaire.getPromotionComments());
				 submitQuestionaireDtls.setSupportComments(pepPPlan369SubmitQuestionaire.getSupportComments());
				 submitQuestionaireDtls.setReviewerId(pepPPlan369SubmitQuestionaire.getReviewerId());
				 submitQuestionaireDtls.setReviewLevel(pepPPlan369SubmitQuestionaire.getReviewLevel());
				 submitQuestionaireDtls.setCreatedDate(pepPPlan369SubmitQuestionaire.getCreatedDate());
				 submitQuestionaireDtls.setModifiedDate(pepPPlan369SubmitQuestionaire.getModifiedDate());
				 submitQuestionaireDtls.setIsActive(pepPPlan369SubmitQuestionaire.getIsActive());
				
				 
				 
				 return pepPPlan369SubmitQuestionaireRepository.saveAndFlush(submitQuestionaireDtls);
			

			 }
		
//		return pepPPlan369Submit;
		
	}
	
	public PepPPlan369SubmitQuestionaire updatePepPPlan369SubmitQuestionaire(PepPPlan369SubmitQuestionaire pepPPlan369SubmitQuestionaire)
	{
		logger.info("In PepPPlan369SubmitQuestionaireService :: updatePepPPlan369SubmitQuestionaire {}", pepPPlan369SubmitQuestionaire);
		
		return pepPPlan369SubmitQuestionaireRepository.save(pepPPlan369SubmitQuestionaire);
		
	}
	
	public PepPPlan369SubmitQuestionaire getPepPPlan369SubmitQuestionaire(Integer id)
	{
		logger.info("In PepPPlan369SubmitQuestionaireService :: getPepPPlan369SubmitQuestionaire {}", id);
		
		return pepPPlan369SubmitQuestionaireRepository.getById(id);
		
	}
	
	public List<PepPPlan369SubmitQuestionaire> getPepPPlan369SubmitQuestionaires()
	{
		logger.info("In PepPPlan369SubmitQuestionaireService :: getPepPPlan369SubmitQuestionaires ");
		
		return pepPPlan369SubmitQuestionaireRepository.findAll();
		
	}
	
	public List<PepPPlan369SubmitQuestionaire> getPepPPlan369SubmitQuestionaireByEmployeeIdAndQuarterId(String employeeId, Integer quarterId)
	{
		logger.info("In PepPPlan369SubmitQuestionaireService :: getPepPPlan369SubmitQuestionaires {}, {} ", employeeId, quarterId);
		
		return pepPPlan369SubmitQuestionaireRepository.getPepPPlan369SubmitQuestionaireByEmployeeIdAndQuarterId(employeeId, quarterId);
		
	}

	
	
	

}
