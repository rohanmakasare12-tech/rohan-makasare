import { Task, CampusEvent, WhatsNextRecommendation } from '../types';

export function computeWhatsNextRecommendation(
  tasks: Task[],
  events: CampusEvent[],
  scenarioOverride?: string
): WhatsNextRecommendation {
  if (scenarioOverride === 'exam_crunch') {
    return {
      id: 'rec-exam',
      title: 'Mid-Term Exam Sprint: Data Structures & Algorithms',
      context: 'Algorithm assessment scheduled in 48 hours. Red-Black trees and graph traversals carry 35% weightage.',
      reason: 'Your practice score on balancing operations is at 45% completion.',
      recommendedAction: 'Execute a 60-minute deep focus session on Red-Black Tree rotation edge cases.',
      actionLabel: 'Start 60m Focus Block',
      actionType: 'start_pomodoro',
      urgency: 'critical',
      estimatedMinutes: 60,
      relatedTaskId: 'task-2',
      scenarioName: 'Exam Crunch Sprint',
    };
  }

  if (scenarioOverride === 'hackathon') {
    return {
      id: 'rec-hackathon',
      title: 'PromptWars Hackathon Kickoff Preparation',
      context: 'PromptWars × KickToTech 2026 kicks off in less than 24 hours at the Innovation Hub.',
      reason: 'You have RSVP’d and are competing in the Education & Student Life track.',
      recommendedAction: 'Finalize your 3-minute pitch outline and test frontend mock flows before registration.',
      actionLabel: 'Review Event Schedule',
      actionType: 'rsvp_event',
      urgency: 'high',
      estimatedMinutes: 30,
      scenarioName: 'Hackathon Eve Mode',
    };
  }

  if (scenarioOverride === 'all_caught_up') {
    return {
      id: 'rec-rest',
      title: 'All Critical Deadlines Cleared! High Performance Zone 🎉',
      context: 'You have completed all pending high-priority deliverables for this week.',
      reason: 'Your 6-day study streak is intact and productivity score is at 94%.',
      recommendedAction: 'Take a restorative 30-minute break or explore upcoming tech workshops to recharge.',
      actionLabel: 'Browse Campus Events',
      actionType: 'rsvp_event',
      urgency: 'low',
      estimatedMinutes: 30,
      scenarioName: 'Balanced & Ahead',
    };
  }

  // Dynamic evaluation:
  // 1. Look for pending or in_progress high-priority tasks
  const pendingHighPriority = tasks.filter(
    (t) => t.priority === 'high' && t.status !== 'completed'
  );

  // Check specifically for Engineering Mechanics or nearest due task
  const urgentTask =
    pendingHighPriority.find((t) => t.subject.toLowerCase().includes('mechanics')) ||
    pendingHighPriority[0] ||
    tasks.find((t) => t.status !== 'completed');

  if (urgentTask) {
    if (urgentTask.progress === 0) {
      return {
        id: `rec-${urgentTask.id}`,
        title: `${urgentTask.subject} Assignment Attention Required`,
        context: `Your ${urgentTask.subject} assignment ("${urgentTask.title}") is due ${urgentTask.dueDate.toLowerCase()} and you have not started it yet.`,
        reason: `Estimated completion time is ${urgentTask.estimatedMinutes} minutes with ${urgentTask.subtasks.length} core subtasks pending.`,
        recommendedAction: `Complete a ${urgentTask.estimatedMinutes}-minute study session now to avoid last-minute rush.`,
        actionLabel: 'Start Task',
        actionType: 'start_pomodoro',
        urgency: 'critical',
        estimatedMinutes: urgentTask.estimatedMinutes,
        relatedTaskId: urgentTask.id,
        scenarioName: 'Default Intelligent Priority',
      };
    } else {
      return {
        id: `rec-${urgentTask.id}-continue`,
        title: `Continue ${urgentTask.subject} Momentum`,
        context: `You are ${urgentTask.progress}% through "${urgentTask.title}" (Due ${urgentTask.dueDate}).`,
        reason: 'You have already completed initial subtasks; wrapping up the remaining problems will secure full marks.',
        recommendedAction: `Spend 40 minutes to finalize the remaining ${
          urgentTask.subtasks.filter((st) => !st.completed).length
        } subtasks.`,
        actionLabel: 'Resume Task',
        actionType: 'start_pomodoro',
        urgency: 'high',
        estimatedMinutes: 40,
        relatedTaskId: urgentTask.id,
        scenarioName: 'In-Progress Acceleration',
      };
    }
  }

  // If all tasks are completed
  return {
    id: 'rec-completed-default',
    title: 'Outstanding Work! No Pending Assignments',
    context: 'All recorded academic tasks have been marked complete.',
    reason: 'Zero overdue or approaching assignments on your dashboard.',
    recommendedAction: 'Log a revision session or preview tomorrow’s lecture schedule.',
    actionLabel: 'View Schedule',
    actionType: 'view_assignment',
    urgency: 'low',
    estimatedMinutes: 25,
    scenarioName: 'Ahead of Schedule',
  };
}
