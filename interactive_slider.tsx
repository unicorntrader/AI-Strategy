import React, { useState, useRef, useEffect } from 'react';

const MultiSliderSurvey = () => {
  const [answers, setAnswers] = useState({
    changeSpeed: 50,
    businessType: 50,
    aiImpact: 50,
    generationalDisruption: 50,
    quadrantSelection: null,
    differentiation: [],
    competitiveAdvantage: [],
    aiValueChange: 50,
    aiLeverage: [],
    biggestCost: null,
    customerFacing: 50
  });
  
  const [showResults, setShowResults] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState(null);
  
  const [dragState, setDragState] = useState({
    isDragging: false,
    activeSlider: null
  });
  
  const questions = [
    {
      id: 'changeSpeed',
      question: 'Where is your business on the "Change" scale?',
      lineName: 'Speed of Change',
      labels: ['Very Slow', '', '', '', 'Very Fast']
    },
    {
      id: 'businessType',
      question: 'Is your business a "trade" or an actual business?',
      lineName: 'Business Type',
      labels: ['Trade', '', '', '', 'Business']
    },
    {
      id: 'aiImpact',
      question: 'What effect do you believe the rise of AI will have on your business?',
      lineName: 'AI Impact',
      labels: ['Very Negative', '', '', '', 'Very Positive']
    },
    {
      id: 'generationalDisruption',
      question: 'In terms of generational disruption, where do you think your business is in the scale?',
      lineName: 'Generational Disruption',
      labels: ['1.0', '', '2.0', '', '3.0'],
      descriptiveLabels: ['AI NOTHING', '', 'AI ENHANCED', '', 'AI NATIVE'],
      isNumeric: true
    },
    {
      id: 'aiValueChange',
      question: 'Does your core value engine change when you introduce AI?',
      lineName: 'AI Value Impact',
      labels: ['Fundamentally Changes', '', '', '', 'Stays the Same']
    },
    {
      id: 'customerFacing',
      question: 'How customer-facing is your business model?',
      lineName: 'Customer Interaction',
      labels: ['B2B Backend', '', '', '', 'Direct Consumer']
    }
  ];

  const updateValue = (sliderId, clientX, sliderElement) => {
    if (sliderElement) {
      const rect = sliderElement.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setAnswers(prev => ({
        ...prev,
        [sliderId]: Math.round(percentage)
      }));
    }
  };

  const CompetitiveAdvantageSelector = () => {
    const options = [
      'Specialized expertise',
      'Technology edge',
      'Scale efficiency',
      'Unique assets/IP',
      'Customer relationships',
      'Market position',
      'Brand reputation',
      'Cost leadership',
      'Innovation capability'
    ];

    const handleAdvantageToggle = (option) => {
      setAnswers(prev => {
        const current = prev.competitiveAdvantage;
        
        if (current.includes(option)) {
          // Remove if already selected
          return {
            ...prev,
            competitiveAdvantage: current.filter(item => item !== option)
          };
        } else if (current.length < 2) {
          // Add if under limit
          return {
            ...prev,
            competitiveAdvantage: [...current, option]
          };
        }
        // Do nothing if already at limit
        return prev;
      });
    };

    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          What's your primary competitive advantage?
        </h3>
        <p className="text-sm text-gray-600 mb-4">Select up to 2 primary sources of competitive advantage:</p>
        
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = answers.competitiveAdvantage.includes(option);
            const isDisabled = !isSelected && answers.competitiveAdvantage.length >= 2;
            
            return (
              <div
                key={option}
                className={`flex items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 cursor-pointer' 
                    : isDisabled
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 cursor-pointer'
                }`}
                onClick={() => !isDisabled && handleAdvantageToggle(option)}
              >
                <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`font-medium select-none ${
                  isSelected ? 'text-blue-700' : isDisabled ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  {option}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          {answers.competitiveAdvantage.length}/2 selected
        </div>
        
        {answers.competitiveAdvantage.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800 mb-1">
              Primary competitive advantages:
            </div>
            <div className="text-sm text-blue-700">
              {answers.competitiveAdvantage.join(', ')}
            </div>
          </div>
        )}
      </div>
    );
  };

  const AILeverageSelector = () => {
    const options = [
      'Reduce staff needs',
      'Automate processes',
      'Enhance marketing',
      'Improve customer service',
      'Speed decision-making', 
      'Generate insights',
      'None of the above'
    ];

    const handleLeverageToggle = (option) => {
      setAnswers(prev => ({
        ...prev,
        aiLeverage: prev.aiLeverage.includes(option)
          ? prev.aiLeverage.filter(item => item !== option)
          : [...prev.aiLeverage, option]
      }));
    };

    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Does AI technology leverage your business in any way?
        </h3>
        <p className="text-sm text-gray-600 mb-4">Select all ways AI could reduce costs and increase efficiency:</p>
        
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = answers.aiLeverage.includes(option);
            
            return (
              <div
                key={option}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
                onClick={() => handleLeverageToggle(option)}
              >
                <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`font-medium select-none ${
                  isSelected ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {option}
                </span>
              </div>
            );
          })}
        </div>
        
        {answers.aiLeverage.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800 mb-1">
              AI leverage opportunities:
            </div>
            <div className="text-sm text-blue-700">
              {answers.aiLeverage.join(', ')}
            </div>
          </div>
        )}
      </div>
    );
  };

  const BiggestCostSelector = () => {
    const options = [
      'Staff salaries',
      'Technology/Software',
      'Marketing/Sales',
      'Physical infrastructure',
      'Compliance/Legal', 
      'Raw materials',
      'Other'
    ];

    const handleCostSelect = (cost) => {
      setAnswers(prev => ({
        ...prev,
        biggestCost: cost
      }));
    };

    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          What's your biggest operational cost?
        </h3>
        <p className="text-sm text-gray-600 mb-4">Select your largest expense category:</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {options.map((option) => {
            const isSelected = answers.biggestCost === option;
            
            return (
              <div
                key={option}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-500 text-white' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                }`}
                onClick={() => handleCostSelect(option)}
              >
                <span className="font-medium select-none text-sm">
                  {option}
                </span>
              </div>
            );
          })}
        </div>
        
        {answers.biggestCost && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">
              Biggest cost: <span className="font-bold">{answers.biggestCost}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (dragState.isDragging && dragState.activeSlider) {
        const sliderElement = document.querySelector(`[data-slider="${dragState.activeSlider}"]`);
        updateValue(dragState.activeSlider, e.clientX, sliderElement);
      }
    };

    const handleGlobalMouseUp = () => {
      setDragState({ isDragging: false, activeSlider: null });
      document.body.style.userSelect = '';
    };

    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [dragState.isDragging, dragState.activeSlider]);

  const calculateDiagnosticResults = () => {
    const changeScore = answers.changeSpeed;
    const businessScore = answers.businessType;
    const aiImpactScore = answers.aiImpact;
    const aiReadinessScore = ((answers.generationalDisruption / 100) * 2 + 1) * 33.33;
    const aiValueScore = answers.aiValueChange;
    const customerScore = answers.customerFacing;
    
    const overallScore = Math.round(
      (changeScore * 0.15) + 
      (businessScore * 0.1) + 
      (aiImpactScore * 0.2) + 
      (aiReadinessScore * 0.35) +
      (aiValueScore * 0.1) +
      (customerScore * 0.1)
    );
    
    let riskLevel, riskColor, riskDescription;
    if (overallScore >= 75) {
      riskLevel = "AI Ready";
      riskColor = "text-green-600";
      riskDescription = "Your business is well-positioned for the AI transformation.";
    } else if (overallScore >= 50) {
      riskLevel = "Moderate Risk";
      riskColor = "text-yellow-600";
      riskDescription = "Your business has some AI preparation but needs strategic focus.";
    } else {
      riskLevel = "High Risk";
      riskColor = "text-red-600";
      riskDescription = "Your business faces significant disruption risk from AI advancement.";
    }
    
    const insights = [];
    
    if (aiReadinessScore < 40) {
      insights.push("⚠️ Low AI integration - immediate action needed to avoid disruption");
    }
    if (changeScore < 30) {
      insights.push("🐌 Slow change adaptation - may struggle with rapid AI evolution");
    }
    if (aiImpactScore > 70) {
      insights.push("✅ Positive AI outlook - good foundation for transformation");
    }
    if (businessScore > 60) {
      insights.push("💼 Business-focused model - better positioned than pure trade");
    }
    if (answers.differentiation.length >= 3) {
      insights.push("🎯 Multiple differentiation factors - strong competitive positioning");
    }
    if (answers.competitiveAdvantage.includes('Specialized expertise') && answers.aiLeverage.includes('Reduce staff needs')) {
      insights.push("🔄 Advantage conflict - expertise-based advantage but AI reduces staff needs");
    }
    if (answers.biggestCost === 'Staff salaries' && answers.aiLeverage.includes('Reduce staff needs')) {
      insights.push("💰 High cost reduction potential - AI can directly impact your biggest expense");
    }
    if (answers.competitiveAdvantage.includes('Scale efficiency') && answers.aiLeverage.length > 2) {
      insights.push("🚀 Strong AI leverage potential - multiple efficiency gains possible");
    }
    if (answers.competitiveAdvantage.length === 2) {
      insights.push("⚖️ Dual competitive advantages - diversified strength but complex AI strategy needed");
    }
    
    const recommendations = [];
    
    if (aiReadinessScore < 50) {
      recommendations.push("Immediate AI integration planning");
      recommendations.push("Staff AI literacy training");
    }
    if (changeScore < 40) {
      recommendations.push("Develop agile business practices");
    }
    if (answers.differentiation.length < 2) {
      recommendations.push("Strengthen competitive differentiation");
    }
    if (answers.competitiveAdvantage.includes('Specialized expertise')) {
      recommendations.push("Explore AI-human collaboration models");
      recommendations.push("Focus on uniquely human capabilities");
    }
    if (answers.competitiveAdvantage.includes('Technology edge')) {
      recommendations.push("Integrate AI into existing tech stack");
      recommendations.push("Maintain technological leadership");
    }
    if (answers.biggestCost === 'Staff salaries' && answers.aiLeverage.includes('Reduce staff needs')) {
      recommendations.push("Develop workforce transition strategy");
      recommendations.push("Calculate ROI of AI automation");
    }
    if (answers.aiLeverage.includes('Generate insights')) {
      recommendations.push("Implement data-driven decision making");
    }
    if (answers.competitiveAdvantage.includes('Customer relationships') && customerScore > 60) {
      recommendations.push("Use AI to enhance customer experience");
    }
    
    return {
      overallScore,
      categoryScores: {
        changeAdaptation: changeScore,
        businessMaturity: businessScore,
        aiImpact: aiImpactScore,
        aiReadiness: aiReadinessScore,
        aiValueAlignment: aiValueScore,
        customerFocus: customerScore
      },
      riskLevel,
      riskColor,
      riskDescription,
      insights,
      recommendations,
      quadrant: answers.quadrantSelection,
      differentiation: answers.differentiation,
      competitiveAdvantage: answers.competitiveAdvantage,
      aiLeverage: answers.aiLeverage,
      biggestCost: answers.biggestCost
    };
  };

  const generatePrompt = (results) => {
    const aiReadinessValue = (1.0 + (answers.generationalDisruption / 100) * 2.0).toFixed(1);
    
    return `I just completed a comprehensive AI Strategy Assessment. Here are my detailed results:

OVERALL SCORE: ${results.overallScore}/100 (${results.riskLevel})

DETAILED QUESTION RESPONSES:

1. "Where is your business on the 'Change' scale?" (Very Slow to Very Fast)
   → My business scored ${answers.changeSpeed}/100 - ${answers.changeSpeed < 25 ? 'Very slow to adapt to change' : answers.changeSpeed < 50 ? 'Below average change adaptation' : answers.changeSpeed < 75 ? 'Moderate change adaptation' : 'Fast change adaptation'}

2. "Is your business a 'trade' or an actual business?" (Trade to Business)
   → My business scored ${answers.businessType}/100 - ${answers.businessType < 25 ? 'More trade-focused' : answers.businessType < 50 ? 'Lean toward trade model' : answers.businessType < 75 ? 'Mixed trade-business model' : 'Full business model'}

3. "What effect do you believe the rise of AI will have on your business?" (Very Negative to Very Positive)
   → My business scored ${answers.aiImpact}/100 - ${answers.aiImpact < 25 ? 'Very negative AI impact expected' : answers.aiImpact < 50 ? 'Somewhat negative AI impact expected' : answers.aiImpact < 75 ? 'Somewhat positive AI impact expected' : 'Very positive AI impact expected'}

4. "In terms of generational disruption, where do you think your business is?" (1.0 AI Nothing to 3.0 AI Native)
   → My business scored ${aiReadinessValue}/3.0 - ${parseFloat(aiReadinessValue) < 1.5 ? 'AI Nothing - no AI integration' : parseFloat(aiReadinessValue) < 2.5 ? 'AI Enhanced - some AI integration' : 'AI Native - built with AI at core'}

5. "Does your core value engine change when you introduce AI?" (Fundamentally Changes to Stays the Same)
   → My business scored ${answers.aiValueChange}/100 - ${answers.aiValueChange < 25 ? 'AI fundamentally changes my value creation' : answers.aiValueChange < 50 ? 'AI moderately changes my value creation' : answers.aiValueChange < 75 ? 'AI slightly changes my value creation' : 'AI does not change my value creation'}

6. "How customer-facing is your business model?" (B2B Backend to Direct Consumer)
   → My business scored ${answers.customerFacing}/100 - ${answers.customerFacing < 25 ? 'Primarily B2B backend operations' : answers.customerFacing < 50 ? 'Mostly B2B with some customer interaction' : answers.customerFacing < 75 ? 'Mixed B2B and consumer interaction' : 'Direct consumer-facing business'}

BUSINESS MODEL & COMPETITIVE PROFILE:
• Business Model Type: ${results.quadrant || 'Not specified'}
• Primary Competitive Advantages: ${results.competitiveAdvantage.length > 0 ? results.competitiveAdvantage.join(', ') : 'Not specified'}
• Biggest Operational Cost: ${results.biggestCost || 'Not specified'}
• Differentiation Factors: ${results.differentiation.length > 0 ? results.differentiation.join(', ') : 'None selected'}

AI LEVERAGE OPPORTUNITIES IDENTIFIED:
${results.aiLeverage.length > 0 ? results.aiLeverage.map(item => `• ${item}`).join('\n') : '• None identified'}

KEY DIAGNOSTIC INSIGHTS:
${results.insights.map(insight => `• ${insight}`).join('\n')}

STRATEGIC RECOMMENDATIONS:
${results.recommendations.map(rec => `• ${rec}`).join('\n')}

Based on my specific assessment responses and business profile, please help me:

1. **Strategic Analysis**: Given my scores on change adaptation (${answers.changeSpeed}/100), AI impact perception (${answers.aiImpact}/100), and AI readiness (${aiReadinessValue}/3.0), what are my biggest AI strategy risks and opportunities?

2. **Action Prioritization**: Considering I'm a ${results.quadrant} business model with ${results.competitiveAdvantage.join(' and ')} as competitive advantages, what should be my top 3-5 priorities for the next 3-6 months?

3. **AI Implementation**: Which specific AI tools or approaches would best match my ${results.quadrant} business model and help leverage my ${results.competitiveAdvantage.join(' and ')} advantages?

4. **Change Management**: My change adaptation score is ${answers.changeSpeed}/100 - how should this influence my AI transformation timeline and approach?

5. **Value Preservation**: Since AI ${answers.aiValueChange < 50 ? 'significantly changes' : 'minimally affects'} my core value creation, how do I protect what makes my business valuable?

6. **Cost-Benefit Analysis**: With ${results.biggestCost} as my biggest cost and potential to ${results.aiLeverage.includes('Reduce staff needs') ? 'reduce staff needs' : 'optimize operations'}, how should I prioritize AI investments for maximum ROI?

Please provide detailed, actionable guidance tailored specifically to my assessment scores and business profile, including concrete next steps and potential pitfalls to avoid given my current AI readiness level.`;
  };

  const handleSubmit = () => {
    const results = calculateDiagnosticResults();
    setAssessmentResults(results);
    setShowResults(true);
  };

  const copyPromptToClipboard = () => {
    const prompt = generatePrompt(assessmentResults);
    navigator.clipboard.writeText(prompt).then(() => {
      alert('Prompt copied to clipboard! You can now paste it into ChatGPT, Claude, or any AI assistant.');
    });
  };

  const SliderComponent = ({ questionData }) => {
    const sliderRef = useRef(null);
    const value = answers[questionData.id];

    const handleMouseDown = (e) => {
      e.preventDefault();
      setDragState({ isDragging: true, activeSlider: questionData.id });
    };

    const handleSliderClick = (e) => {
      if (!dragState.isDragging) {
        updateValue(questionData.id, e.clientX, sliderRef.current);
      }
    };

    const getLabelForValue = (value) => {
      const index = Math.floor((value / 100) * (questionData.labels.length - 1));
      return questionData.labels[Math.min(index, questionData.labels.length - 1)];
    };

    const getDisplayValue = (value) => {
      if (questionData.isNumeric) {
        const numericValue = 1.0 + (value / 100) * 2.0;
        return numericValue.toFixed(1);
      }
      return getLabelForValue(value);
    };

    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {questionData.question}
        </h3>
        
        {questionData.lineName && (
          <div className="text-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {questionData.lineName}
            </span>
          </div>
        )}
        
        <div className="mb-4">
          <div 
            ref={sliderRef}
            data-slider={questionData.id}
            className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer"
            onClick={handleSliderClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full pointer-events-none"
              style={{ width: `${value}%` }}
            />
            
            <div 
              className={`absolute top-1/2 w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-md cursor-grab transform -translate-y-1/2 ${
                dragState.isDragging && dragState.activeSlider === questionData.id ? 'scale-110 cursor-grabbing' : 'hover:scale-105'
              }`}
              style={{ left: `calc(${value}% - 12px)` }}
              onMouseDown={handleMouseDown}
            />
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {questionData.labels.map((label, index) => (
              <div key={index} className="text-center max-w-16">
                <div className="font-semibold">{label}</div>
                {questionData.descriptiveLabels && (
                  <div className="text-xs mt-1">{questionData.descriptiveLabels[index]}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">
            {getDisplayValue(value)}
          </div>
        </div>
      </div>
    );
  };

  const QuadrantSelector = () => {
    const quadrants = [
      { id: 'platform', label: 'PLATFORM', position: 'top-left' },
      { id: 'tool', label: 'TOOL', position: 'top-right' },
      { id: 'trade', label: 'TRADE', position: 'bottom-left' },
      { id: 'business', label: 'BUSINESS', position: 'bottom-right' }
    ];

    const handleQuadrantSelect = (quadrantId) => {
      setAnswers(prev => ({
        ...prev,
        quadrantSelection: quadrantId
      }));
    };

    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          What type of business model best describes your company?
        </h3>
        
        <div className="flex justify-center">
          <div className="relative w-80 h-80">
            <div className="w-full h-full rounded-full border-4 border-gray-300 relative overflow-hidden">
              <div className="absolute left-1/2 top-0 w-1 h-full bg-gray-300 transform -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 transform -translate-y-1/2"></div>
              
              {quadrants.map((quadrant) => {
                const isSelected = answers.quadrantSelection === quadrant.id;
                const baseClasses = "absolute w-1/2 h-1/2 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-blue-50";
                const selectedClasses = isSelected ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-blue-50";
                
                let positionClasses = "";
                let borderClasses = "";
                
                switch(quadrant.position) {
                  case 'top-left':
                    positionClasses = "top-0 left-0";
                    borderClasses = "rounded-tl-full";
                    break;
                  case 'top-right':
                    positionClasses = "top-0 right-0";
                    borderClasses = "rounded-tr-full";
                    break;
                  case 'bottom-left':
                    positionClasses = "bottom-0 left-0";
                    borderClasses = "rounded-bl-full";
                    break;
                  case 'bottom-right':
                    positionClasses = "bottom-0 right-0";
                    borderClasses = "rounded-br-full";
                    break;
                }
                
                return (
                  <div
                    key={quadrant.id}
                    className={`${baseClasses} ${selectedClasses} ${positionClasses} ${borderClasses}`}
                    onClick={() => handleQuadrantSelect(quadrant.id)}
                  >
                    <span className="font-bold text-sm select-none">
                      {quadrant.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {answers.quadrantSelection && (
          <div className="text-center mt-4">
            <div className="text-lg font-semibold text-blue-600">
              Selected: {quadrants.find(q => q.id === answers.quadrantSelection)?.label}
            </div>
          </div>
        )}
      </div>
    );
  };

  const DifferentiationSelector = () => {
    const options = [
      'Brand',
      'First-Mover Advantage',
      'Scale',
      'Distribution',
      'Localisation',
      'Globalisation',
      'Niche Play'
    ];

    const handleOptionToggle = (option) => {
      setAnswers(prev => ({
        ...prev,
        differentiation: prev.differentiation.includes(option)
          ? prev.differentiation.filter(item => item !== option)
          : [...prev.differentiation, option]
      }));
    };

    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          In a world with abundant compute, no code, abundant capital and resources - what is your differentiation?
        </h3>
        <p className="text-sm text-gray-600 mb-4">Select one or more options:</p>
        
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = answers.differentiation.includes(option);
            
            return (
              <div
                key={option}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
                onClick={() => handleOptionToggle(option)}
              >
                <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`font-medium select-none ${
                  isSelected ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {option}
                </span>
              </div>
            );
          })}
        </div>
        
        {answers.differentiation.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800 mb-1">
              Selected differentiation factors:
            </div>
            <div className="text-sm text-blue-700">
              {answers.differentiation.join(', ')}
            </div>
          </div>
        )}
      </div>
    );
  };

  const ResultsDisplay = () => {
    if (!assessmentResults) return null;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              AI Strategy Assessment Results
            </h1>
            <p className="text-gray-600">
              Your diagnostic analysis and next steps
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {assessmentResults.overallScore}
              </div>
              <div className="text-lg text-gray-600 mb-2">Overall AI Readiness Score</div>
              <div className={`text-2xl font-semibold ${assessmentResults.riskColor} mb-2`}>
                {assessmentResults.riskLevel}
              </div>
              <p className="text-gray-700">
                {assessmentResults.riskDescription}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {Object.entries(assessmentResults.categoryScores).map(([category, score]) => {
              const categoryNames = {
                changeAdaptation: 'Change Adaptation',
                businessMaturity: 'Business Maturity',
                aiImpact: 'AI Impact Outlook',
                aiReadiness: 'AI Integration Level',
                aiValueAlignment: 'AI Value Alignment',
                customerFocus: 'Customer Focus'
              };
              
              return (
                <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">{categoryNames[category]}</span>
                    <span className="text-2xl font-bold text-blue-600">{Math.round(score)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Key Insights</h3>
            <div className="space-y-2">
              {assessmentResults.insights.map((insight, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-gray-700">{insight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Strategic Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {assessmentResults.recommendations.map((rec, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-3">
                  <span className="font-medium text-blue-800">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Continue Your Analysis</h3>
            <p className="text-gray-600 mb-4">
              Take your assessment results to ChatGPT, Claude, or any AI assistant for deeper strategic guidance.
            </p>
            <button 
              onClick={copyPromptToClipboard}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
            >
              📋 Copy Detailed Prompt for AI Discussion
            </button>
          </div>

          <div className="text-center">
            <button 
              onClick={() => setShowResults(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              ← Back to Assessment
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (showResults) {
    return <ResultsDisplay />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Creating an AI Strategy - Exercise
          </h1>
          <p className="text-gray-600">
            Please drag the sliders to assess your business characteristics
          </p>
        </div>
        
        <div className="space-y-6">
          {questions.map((question) => (
            <SliderComponent key={question.id} questionData={question} />
          ))}
          
          <QuadrantSelector />
          
          <DifferentiationSelector />
          
          <CompetitiveAdvantageSelector />
          
          <AILeverageSelector />
          
          <BiggestCostSelector />
        </div>
        
        <div className="mt-8 text-center">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
            onClick={handleSubmit}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiSliderSurvey;